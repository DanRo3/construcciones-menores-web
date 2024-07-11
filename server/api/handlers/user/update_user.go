package user

import (
	"context"
	"strings"

	"github.com/ProImpact/construccionesMenores/internal/database/model"
	"github.com/ProImpact/construccionesMenores/internal/database/repository"
	userRepository "github.com/ProImpact/construccionesMenores/internal/database/repository/user"
	validator "github.com/ProImpact/construccionesMenores/internal/service/user"
	"github.com/labstack/echo/v4"
)

func UpdateUser(c echo.Context) error {
	user := new(model.User)
	if err := c.Bind(user); err != nil {
		return c.JSON(400, map[string]any{
			"status": "error",
			"error":  err.Error(),
		})
	}
	valida := validator.UserValidaor{}
	valida.Validate(*user)
	if len(valida.Errors) > 0 {
		return c.JSON(200, map[string]any{
			"status": "error",
			"errors": valida.Errors,
		})
	}

	if !userRepository.Exists(user.ID, repository.GetConnector()) {
		return c.JSON(500, map[string]any{
			"status": "error",
			"error":  "Id de usuario no registrado en la base de datos",
		})
	}

	if err := userRepository.UpdateInfo(*user, repository.GetConnector()); err != nil {
		if strings.Contains(err.Error(), "user_name_key") {
			return c.JSON(500, map[string]any{
				"status": "error",
				"error":  "Nombre ya registrado",
			})
		}
		if strings.Contains(err.Error(), "user_email_key") {
			return c.JSON(500, map[string]any{
				"status": "error",
				"error":  "Email ya registrado",
			})
		}
		if strings.Contains(err.Error(), "user_phone_key") {
			return c.JSON(500, map[string]any{
				"status": "error",
				"error":  "Numero de telefono ya registrado",
			})
		}
		return c.JSON(500, map[string]any{
			"status": "error",
			"error":  err.Error(),
		})
	}
	repository.GetConnector().DeallocateAll(context.Background())
	return c.JSON(200, map[string]any{
		"status": "success",
		"user":   user,
	})
}
