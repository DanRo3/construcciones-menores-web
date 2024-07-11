package pedido

import (
	"context"

	"github.com/ProImpact/construccionesMenores/internal/database/repository"
	repo "github.com/ProImpact/construccionesMenores/internal/database/repository/pedido"
	"github.com/labstack/echo/v4"
)

func SetStatus(e echo.Context) error {
	var Status struct {
		Id   int    `json:"id"`
		Mode string `json:"modo"`
	}
	if err := e.Bind(&Status); err != nil {
		return e.JSON(400, map[string]any{
			"stattus": "error",
			"message": err.Error(),
		})
	}
	if Status.Mode == "" {
		return e.JSON(400, map[string]any{
			"stattus": "error",
			"message": "Modo no establecido o vacio",
		})
	}

	if !repo.Exists(Status.Id, repository.GetConnector()) {
		return e.JSON(400, map[string]any{
			"stattus": "error",
			"message": "El id no se encuentra registrado",
		})
	}
	repository.GetConnector().DeallocateAll(context.Background())
	if err := repo.SetMode(Status.Mode, Status.Id, repository.GetConnector()); err != nil {
		return e.JSON(400, map[string]any{
			"stattus": "error",
			"message": err.Error(),
		})
	}
	return nil
}
