package midlawer

import (
	"log"
	"net/http"

	"github.com/labstack/echo/v4"
)

func Cors(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {

		c.Request().Header.Add("Access-Control-Allow-Origin", "*")
		log.Println("Peticion ejecutada")
		//c.Request().Header["Access-Control-Allow-Origin"] = []string{"http://localhost:3000/*"}          // Permite solicitudes desde cualquier origen

		c.Request().Header.Add("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		//c.Request().Header["Access-Control-Allow-Methods"] = []string{"GET, POST, PUT, DELETE, OPTIONS"} // Permite los métodos HTTP
		c.Response().Status = http.StatusAccepted

		return next(c)
	}
}
