package user

import (
	"context"
	"strings"

	"github.com/ProImpact/construccionesMenores/internal/database/model"
	"github.com/ProImpact/construccionesMenores/internal/database/repository"
	userRepository "github.com/ProImpact/construccionesMenores/internal/database/repository/user"
	service "github.com/ProImpact/construccionesMenores/internal/service/user"
	"github.com/labstack/echo/v4"
)

func CreateUser(g echo.Context) error {
	user := new(model.User)
	if err := g.Bind(user); err != nil {
		return err
	}
	valid := service.UserValidaor{}
	valid.Validate(*user)
	if len(valid.Errors) > 0 {
		return g.JSON(200, map[string]any{
			"status": "error",
			"errors": valid.Errors,
		})
	}
	if err := userRepository.CreateUser(*user, repository.GetConnector()); err != nil {
		if strings.Contains(err.Error(), "user_name_key") {
			return g.JSON(500, map[string]any{
				"status": "error",
				"error":  "Nombre ya registrado",
			})
		}
		if strings.Contains(err.Error(), "user_email_key") {
			return g.JSON(500, map[string]any{
				"status": "error",
				"error":  "Email ya registrado",
			})
		}
		if strings.Contains(err.Error(), "user_phone_key") {
			return g.JSON(500, map[string]any{
				"status": "error",
				"error":  "Numero de telefono ya registrado",
			})
		}
		return g.JSON(500, map[string]any{
			"status": "error",
			"error":  err.Error(),
		})
	}
	repository.GetConnector().DeallocateAll(context.Background())
	return g.JSON(201, map[string]any{
		"status": "success",
		"user":   user,
	})
}
