package midlawer

import (
	"github.com/ProImpact/construccionesMenores/internal/service/auth"
	"github.com/labstack/echo/v4"
)

func Admin(next echo.HandlerFunc) echo.HandlerFunc {
	return func(e echo.Context) error {
		cok, err := e.Cookie("session")
		if err != nil {
			return e.JSON(500, map[string]any{
				"status": "error",
				"error":  "cookie de session no enviado",
			})
		}
		sess, err := auth.VerifyToken(cok.Value)
		if err != nil {
			return e.JSON(500, map[string]any{
				"status": "error",
				"error":  err.Error(),
			})
		}
		if sess.Role != "admin" {
			return e.JSON(500, map[string]any{
				"status": "error",
				"error":  "Protect route admin only",
			})
		}
		return next(e)
	}
}
