package feedback

import (
	"context"

	"github.com/ProImpact/construccionesMenores/internal/database/repository"
	"github.com/ProImpact/construccionesMenores/internal/database/repository/feedback"
	"github.com/labstack/echo/v4"
)

func GetAll(e echo.Context) error {
	feed, err := feedback.GetAllFeedBacks(repository.GetConnector())
	if err != nil {
		return e.JSON(500, map[string]string{
			"status": "error",
			"error":  err.Error(),
		})
	}
	repository.GetConnector().DeallocateAll(context.Background())
	return e.JSON(200, map[string]any{
		"status": "success",
		"feeds":  feed,
	})
}
