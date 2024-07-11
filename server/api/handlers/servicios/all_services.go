package servicios

import (
	"context"

	"github.com/ProImpact/construccionesMenores/internal/database/repository"
	"github.com/ProImpact/construccionesMenores/internal/database/repository/servicio"
	"github.com/labstack/echo/v4"
)

func GetAllService(e echo.Context) error {
	service, err := servicio.GetAllServices(repository.GetConnector())
	if err != nil {
		return e.JSON(500, map[string]string{
			"status": "error",
			"error":  err.Error(),
		})
	}
	repository.GetConnector().DeallocateAll(context.Background())
	return e.JSON(200, map[string]interface{}{
		"status":   "success",
		"services": service,
	})
}
