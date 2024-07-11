package pedido

import (
	"context"

	"github.com/ProImpact/construccionesMenores/internal/database/model"
	"github.com/ProImpact/construccionesMenores/internal/database/repository"
	"github.com/ProImpact/construccionesMenores/internal/database/repository/pedido"
	"github.com/ProImpact/construccionesMenores/internal/database/repository/servicio"
	"github.com/ProImpact/construccionesMenores/internal/database/repository/user"
	"github.com/ProImpact/construccionesMenores/internal/service/pedidos"
	"github.com/labstack/echo/v4"
)

func CreatePedido(g echo.Context) error {
	ped := new(model.Pedido)
	if err := g.Bind(ped); err != nil {
		return err
	}
	valid := pedidos.Validator{}
	valid.Validate(*ped)
	if len(valid.Errors) > 0 {
		return g.JSON(200, map[string]any{
			"status": "error",
			"errors": valid.Errors,
		})
	}
	if !user.Exists(ped.UserID, repository.GetConnector()) {
		return g.JSON(200, map[string]any{
			"status": "error",
			"errors": "id de usuario no encontrado",
		})
	}

	if !servicio.Exists(ped.UserID, repository.GetConnector()) {
		return g.JSON(200, map[string]any{
			"status": "error",
			"errors": "id de servicio no encontrado",
		})
	}

	if err := pedido.CreatePedido(*ped, repository.GetConnector()); err != nil {
		// ! Error handling here

		return g.JSON(200, map[string]any{
			"status": "error",
			"errors": err.Error(),
		})
	}
	repository.GetConnector().DeallocateAll(context.Background())
	return g.JSON(201, map[string]any{
		"status":  "success",
		"service": ped,
	})
}
