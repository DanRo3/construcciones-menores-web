package user

import (
	"context"

	"github.com/ProImpact/construccionesMenores/internal/database/repository"
	userRepository "github.com/ProImpact/construccionesMenores/internal/database/repository/user"
	"github.com/labstack/echo/v4"
)

func DeleteUser(c echo.Context) error {
	var requestBody struct {
		ID int `json:"id" binding:"required"`
	}

	if err := c.Bind(&requestBody); err != nil {
		return c.JSON(400, map[string]any{
			"status": "error",
			"error":  "Id no encontrado o vacio",
		})
	}

	if err := userRepository.DeleteUser(requestBody.ID, repository.GetConnector()); err != nil {
		return c.JSON(500, map[string]any{
			"status": "error",
			"error":  "Id no encontrado o vacio",
		})
	}
	repository.GetConnector().DeallocateAll(context.Background())
	return c.JSON(200, map[string]any{
		"status":  "success",
		"message": "User deleted",
	})
}
