package productos

import (
	"context"
	"log"

	"github.com/ProImpact/construccionesMenores/internal/database/repository"
	"github.com/ProImpact/construccionesMenores/internal/database/repository/producto"
	"github.com/labstack/echo/v4"
)

func GetAllProducts(e echo.Context) error {
	productos, err := producto.GetAllProducts(repository.GetConnector())
	if err != nil {
		log.Println(err)
		return e.JSON(500, map[string]string{
			"status": "error",
			"error":  err.Error(),
		})
	}
	repository.GetConnector().DeallocateAll(context.Background())
	return e.JSON(200, map[string]interface{}{
		"status":  "success",
		"product": productos,
	})
}
