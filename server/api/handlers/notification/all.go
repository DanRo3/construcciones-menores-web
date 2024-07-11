package notification

import (
	"context"

	"github.com/ProImpact/construccionesMenores/internal/database/repository"
	"github.com/ProImpact/construccionesMenores/internal/database/repository/notification"
	"github.com/labstack/echo/v4"
)

func All(e echo.Context) error {
	var Message struct {
		Mess string `json:"message"`
	}
	if err := e.Bind(&Message); err != nil {
		return e.JSON(400, map[string]any{
			"status":   "error",
			"messsage": err.Error(),
		})
	}
	if Message.Mess == "" {
		return e.JSON(400, map[string]any{
			"status":   "error",
			"messsage": "Campo de la notificacion vacio",
		})
	}
	if err := notification.Notify(Message.Mess, repository.GetConnector()); err != nil {
		return e.JSON(400, map[string]any{
			"status":   "error",
			"messsage": err,
		})
	}
	repository.GetConnector().DeallocateAll(context.Background())
	return e.JSON(400, map[string]any{
		"status":   "success",
		"messsage": "Todos los usuarios subscritos han sido notificados",
	})
}
