package servicios

import (
	"context"

	"github.com/ProImpact/construccionesMenores/internal/database/repository"
	"github.com/ProImpact/construccionesMenores/internal/database/repository/servicio"
	"github.com/labstack/echo/v4"
)

func DeleteService(c echo.Context) error {
	var requestBody struct {
		ID int `json:"id" binding:"required"`
	}

	if err := c.Bind(&requestBody); err != nil {
		return c.JSON(400, map[string]any{
			"status": "error",
			"error":  "Id no encontrado o vacio",
		})
	}

	if err := servicio.DeleteServicio(requestBody.ID, repository.GetConnector()); err != nil {
		return c.JSON(500, map[string]any{
			"status": "error",
			"error":  "Id no encontrado o vacio",
		})
	}
	repository.GetConnector().DeallocateAll(context.Background())
	return c.JSON(200, map[string]any{
		"status":  "success",
		"message": "Service deleted",
	})
}
