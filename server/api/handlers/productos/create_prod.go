package productos

import (
	"context"
	"net/http"
	"strings"

	"github.com/ProImpact/construccionesMenores/internal/database/model"
	"github.com/ProImpact/construccionesMenores/internal/database/repository"
	"github.com/ProImpact/construccionesMenores/internal/database/repository/producto"
	service "github.com/ProImpact/construccionesMenores/internal/service/producto"
	"github.com/labstack/echo/v4"
)

func CreateProduct(g echo.Context) error {
	prod := new(model.Producto)
	if err := g.Bind(prod); err != nil {
		return err
	}
	valid := service.Validator{}
	valid.Validate(*prod)
	if len(valid.Errors) > 0 {
		return g.JSON(200, map[string]any{
			"status": "error",
			"errors": valid.Errors,
		})
	}
	if err := producto.CreateProducto(*prod, repository.GetConnector()); err != nil {
		if strings.Contains(err.Error(), "producto_nombre_key") {
			return g.JSON(http.StatusBadRequest, map[string]any{
				"status": "error",
				"errors": "Nombre ya registrado",
			})
		}

		return g.JSON(200, map[string]any{
			"status": "error",
			"errors": err.Error(),
		})
	}
	repository.GetConnector().DeallocateAll(context.Background())
	return g.JSON(201, map[string]any{
		"status":  "success",
		"product": prod,
	})
}
