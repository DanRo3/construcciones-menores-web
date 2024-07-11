package pedido

import (
	"context"

	"github.com/ProImpact/construccionesMenores/internal/database/repository"
	"github.com/ProImpact/construccionesMenores/internal/database/repository/pedido"
	"github.com/labstack/echo/v4"
)

func GetAllPedidos(e echo.Context) error {
	pedido, err := pedido.GetAllPedidos(repository.GetConnector())
	if err != nil {
		return e.JSON(500, map[string]any{
			"status": "error",
			"error":  err.Error(),
		})
	}
	repository.GetConnector().DeallocateAll(context.Background())
	return e.JSON(200, map[string]any{
		"status":  "success",
		"pedidos": pedido,
	})
}
