package servicios

import (
	"context"

	"github.com/ProImpact/construccionesMenores/internal/database/repository"
	"github.com/ProImpact/construccionesMenores/internal/database/repository/servicio"
	"github.com/labstack/echo/v4"
)

func GetService(c echo.Context) error {
	requestBody := struct {
		ID int `json:"id"`
	}{}

	if err := c.Bind(&requestBody); err != nil {
		return c.JSON(400, map[string]any{
			"status": "error",
			"error":  "Id no introducido",
		})
	}
	user, err := servicio.GetServicio(requestBody.ID, repository.GetConnector())
	if err != nil {
		return c.JSON(404, map[string]any{
			"status": "error",
			"error":  "Id no encontrado o vacio",
		})
	}
	repository.GetConnector().DeallocateAll(context.Background())
	return c.JSON(200, map[string]any{
		"status":   "success",
		"servicio": user,
	})
}
