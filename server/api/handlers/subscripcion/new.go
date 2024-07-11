package subscripcion

import (
	"context"
	"strings"

	"github.com/ProImpact/construccionesMenores/internal/database/model"
	"github.com/ProImpact/construccionesMenores/internal/database/repository"
	"github.com/ProImpact/construccionesMenores/internal/database/repository/subscripcion"
	"github.com/ProImpact/construccionesMenores/pkg/validator"
	"github.com/labstack/echo/v4"
)

func New(e echo.Context) error {
	var email struct {
		Email string `json:"email"`
	}
	if err := e.Bind(&email); err != nil {
		return err
	}
	if email.Email == "" {
		return e.JSON(400, map[string]any{
			"status":  "error",
			"message": "email vacio o no introducido",
		})
	}
	if err := validator.ValidateEmail(email.Email); err != nil {
		return e.JSON(400, map[string]any{
			"status":  "error",
			"message": err.Error(),
		})
	}
	if err := subscripcion.Create(repository.GetConnector(), model.Subscripcion{
		Mail: email.Email,
	}); err != nil {
		if strings.Contains(err.Error(), "(SQLSTATE 23505)") {
			return e.JSON(400, map[string]any{
				"status":  "error",
				"message": "Ya una subscripcion fue realizada con este email",
			})
		}
		return e.JSON(400, map[string]any{
			"status":  "error",
			"message": err.Error(),
		})
	} else {
		repository.GetConnector().DeallocateAll(context.Background())
		return e.JSON(200, map[string]any{
			"status":  "success",
			"message": "Subscripcion creada,pronto resivira los mensajes de promocion.",
		})
	}
}
