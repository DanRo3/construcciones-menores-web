package servicios

import (
	"context"
	"log"
	"strings"

	"github.com/ProImpact/construccionesMenores/internal/database/model"
	"github.com/ProImpact/construccionesMenores/internal/database/repository"
	"github.com/ProImpact/construccionesMenores/internal/database/repository/servicio"
	"github.com/ProImpact/construccionesMenores/internal/service/servicios"
	"github.com/labstack/echo/v4"
)

func CreateService(g echo.Context) error {
	user := new(model.Service)
	if err := g.Bind(user); err != nil {
		return err
	}
	valid := servicios.Validator{}
	valid.Validate(*user)
	if len(valid.Errors) > 0 {
		return g.JSON(200, map[string]any{
			"status": "error",
			"errors": valid.Errors,
		})
	}
	if err := servicio.CreateServicio(*user, repository.GetConnector()); err != nil {
		log.Println(err)
		if strings.Contains(err.Error(), "servicio_nombre_key") {
			return g.JSON(200, map[string]any{
				"status": "error",
				"errors": "Ya hay un servicio registrado con el mismo nombre",
			})
		}
		if strings.Contains(err.Error(), "servicio_imgpath_key") {
			return g.JSON(200, map[string]any{
				"status": "error",
				"errors": "Ya hay un servicio registrado con la misma imagen",
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
		"service": user,
	})
}
