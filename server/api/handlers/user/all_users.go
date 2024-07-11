package user

import (
	"context"

	"github.com/ProImpact/construccionesMenores/internal/database/repository"
	"github.com/ProImpact/construccionesMenores/internal/database/repository/user"
	"github.com/labstack/echo/v4"
)

func GetAllUsers(e echo.Context) error {
	users, err := user.GetAllUsers(repository.GetConnector())
	if err != nil {
		return e.JSON(500, map[string]string{
			"status": "error",
			"error":  err.Error(),
		})
	}
	repository.GetConnector().DeallocateAll(context.Background())
	return e.JSON(200, map[string]interface{}{
		"status": "success",
		"users":  users,
	})
}
