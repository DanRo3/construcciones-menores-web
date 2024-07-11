package subscripcion

import (
	"context"

	"github.com/ProImpact/construccionesMenores/internal/database/repository"
	"github.com/ProImpact/construccionesMenores/internal/database/repository/subscripcion"
	"github.com/labstack/echo/v4"
)

func All(e echo.Context) error {
	service, err := subscripcion.AllSubscriptores(repository.GetConnector())
	if err != nil {
		return e.JSON(500, map[string]string{
			"status": "error",
			"error":  err.Error(),
		})
	}
	repository.GetConnector().DeallocateAll(context.Background())
	return e.JSON(200, map[string]interface{}{
		"status":        "success",
		"subscriptores": service,
	})
}
