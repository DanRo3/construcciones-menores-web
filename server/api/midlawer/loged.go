package midlawer

import (
	"github.com/ProImpact/construccionesMenores/internal/service/auth"
	"github.com/labstack/echo/v4"
)

func IsLoged(c echo.HandlerFunc) echo.HandlerFunc {
	return func(e echo.Context) error {
		cok, err := e.Cookie("session")
		if err != nil {
			return e.JSON(500, map[string]any{
				"status": "error",
				"error":  "cookie de session no enviado",
			})
		}
		_, err = auth.VerifyToken(cok.Value)
		if err != nil {
			return e.JSON(500, map[string]any{
				"status": "error",
				"error":  err.Error(),
			})
		}
		return c(e)
	}
}
