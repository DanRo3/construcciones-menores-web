package login

import (
	"context"
	"strings"

	"github.com/ProImpact/construccionesMenores/internal/database/model"
	"github.com/ProImpact/construccionesMenores/internal/database/repository"
	"github.com/ProImpact/construccionesMenores/internal/database/repository/user"
	"github.com/ProImpact/construccionesMenores/internal/service/auth"
	"github.com/labstack/echo/v4"
)

func Login(e echo.Context) error {
	var Request struct {
		Username string `json:"username"`
		Password string `json:"password"`
	}

	if err := e.Bind(&Request); err != nil {
		return e.JSON(400, map[string]any{
			"status": "error",
			"error":  "Formato de la peticion invalido necesario username,password",
		})
	}

	if Request.Username == "" || Request.Password == "" {
		return e.JSON(400, map[string]any{
			"status": "error",
			"error":  "Uno de los campos estan basios vacios",
		})
	}
	var use model.User
	var err error
	if strings.Contains(Request.Username, "@") {
		use, err = user.WithEmail(Request.Username, repository.GetConnector())
		if err != nil {
			return e.JSON(400, map[string]any{
				"status": "error",
				"error":  "Usuario no encontrado",
			})
		}
	} else {
		use, err = user.GetUserByName(Request.Username, repository.GetConnector())
		if err != nil {
			return e.JSON(400, map[string]any{
				"status": "error",
				"error":  "Usuario no encontrado",
			})
		}
	}

	pass := auth.SecurePassword(Request.Password)
	if pass != use.Password {
		return e.JSON(400, map[string]any{
			"status": "error",
			"error":  "Contraseña incorrecta",
		})
	}
	session, err := auth.GenerateJWTToken(use.ID, use.Role)
	if err != nil {
		return e.JSON(500, map[string]any{
			"status": "error",
			"error":  "Error al generar token:" + err.Error(),
		})
	}
	repository.GetConnector().DeallocateAll(context.Background())
	return e.JSON(200, map[string]any{
		"status": "success",
		"t_auth": session,
		"rol":    use.Role,
		"id":     use.ID,
	})

}
