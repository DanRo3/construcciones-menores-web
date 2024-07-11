package feedback

import (
	"context"

	"github.com/ProImpact/construccionesMenores/internal/database/model"
	"github.com/ProImpact/construccionesMenores/internal/database/repository"
	repo "github.com/ProImpact/construccionesMenores/internal/database/repository/feedback"
	"github.com/ProImpact/construccionesMenores/internal/service/feedback"
	"github.com/labstack/echo/v4"
)

func Create(g echo.Context) error {
	feed := new(model.FeedBack)
	if err := g.Bind(feed); err != nil {
		return err
	}
	valid := feedback.Validator{}
	valid.Validate(*feed)
	if len(valid.Errors) > 0 {
		return g.JSON(200, map[string]any{
			"status": "error",
			"errors": valid.Errors,
		})
	}
	if err := repo.CreateFeedBack(*feed, repository.GetConnector()); err != nil {
		return g.JSON(200, map[string]any{
			"status": "error",
			"errors": err.Error(),
		})
	}
	repository.GetConnector().DeallocateAll(context.Background())
	return g.JSON(201, map[string]any{
		"status":  "success",
		"service": feed,
	})
}
