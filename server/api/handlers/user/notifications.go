package user

import (
	"context"

	"github.com/ProImpact/construccionesMenores/internal/database/repository"
	"github.com/ProImpact/construccionesMenores/internal/database/repository/notification"
	"github.com/ProImpact/construccionesMenores/internal/database/repository/user"
	"github.com/labstack/echo/v4"
)

func Notifications(e echo.Context) error {
	var User struct {
		Id int `json:"id"`
	}
	if err := e.Bind(&User); err != nil {
		return e.JSON(400, map[string]any{
			"status":  "error",
			"message": err.Error(),
		})
	}
	if !user.Exists(User.Id, repository.GetConnector()) {
		return e.JSON(400, map[string]any{
			"status":  "error",
			"message": "El id del usuario no existe en la base de datos",
		})
	}
	noti, err := notification.GetNotificationByUserID(repository.GetConnector(), int64(User.Id))
	if err != nil {
		return e.JSON(400, map[string]any{
			"status":  "error",
			"message": err,
		})
	}
	repository.GetConnector().DeallocateAll(context.Background())
	return e.JSON(200, map[string]any{
		"status":  "success",
		"message": noti,
	})
}
