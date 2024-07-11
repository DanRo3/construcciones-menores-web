package api

import (
	"github.com/ProImpact/construccionesMenores/api/handlers/feedback"
	"github.com/ProImpact/construccionesMenores/api/handlers/login"
	"github.com/ProImpact/construccionesMenores/api/handlers/notification"
	"github.com/ProImpact/construccionesMenores/api/handlers/pedido"
	"github.com/ProImpact/construccionesMenores/api/handlers/productos"
	"github.com/ProImpact/construccionesMenores/api/handlers/servicios"
	"github.com/ProImpact/construccionesMenores/api/handlers/subscripcion"
	"github.com/ProImpact/construccionesMenores/api/handlers/user"
	"github.com/ProImpact/construccionesMenores/api/midlawer"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func CreateRouter() *echo.Echo {
	e := echo.New()

	// Middleware básicos
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())
	// Configuración manual de CORS
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins:     []string{"http://localhost:3000"}, // Cambia esto al origen que necesites
		AllowMethods:     []string{echo.GET, echo.POST, echo.PUT, echo.DELETE, echo.OPTIONS},
		AllowCredentials: true,
		AllowHeaders:     []string{echo.HeaderOrigin, echo.HeaderContentType, echo.HeaderAccept, echo.HeaderAuthorization},
	}))

	// Rutas públicas
	e.POST("/feedback", feedback.Create)
	e.POST("/login", login.Login)
	e.POST("/subscribirse", subscripcion.New)
	e.POST("/registro", user.CreateUser)
	e.GET("/productos", productos.GetAllProducts)
	e.GET("/services", servicios.GetAllService)

	// Rutas de usuario
	use := e.Group("user", midlawer.IsLoged)
	use.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins:     []string{"http://localhost:3000"}, // Cambia esto al origen que necesites
		AllowMethods:     []string{echo.GET, echo.POST, echo.PUT, echo.DELETE, echo.OPTIONS},
		AllowCredentials: true,
		AllowHeaders:     []string{echo.HeaderOrigin, echo.HeaderContentType, echo.HeaderAccept, echo.HeaderAuthorization},
	}))
	use.GET("/producto", productos.GetProduct)
	use.GET("/productos", productos.GetAllProducts)
	use.GET("/pedido", pedido.GetPedido)
	use.GET("/pedidos", pedido.GetAllPedidos)
	use.POST("/updateUser", user.UpdateUser)
	use.GET("/notifications", user.Notifications)
	use.POST("/deleteNotification", notification.Delete)
	use.POST("/pedido", pedido.CreatePedido)

	// Rutas de administrador
	admin := e.Group("admin", midlawer.Admin)
	admin.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins:     []string{"http://localhost:3000"}, // Cambia esto al origen que necesites
		AllowMethods:     []string{echo.GET, echo.POST, echo.PUT, echo.DELETE, echo.OPTIONS},
		AllowCredentials: true,
		AllowHeaders:     []string{echo.HeaderOrigin, echo.HeaderContentType, echo.HeaderAccept, echo.HeaderAuthorization},
	}))

	admin.GET("/service", servicios.GetService)
	admin.GET("/services", servicios.GetAllService)
	admin.POST("/service", servicios.CreateService)
	admin.POST("/deleteService", servicios.DeleteService)

	admin.POST("/user", user.CreateUser)
	admin.GET("/user", user.GetUser)
	admin.POST("/deleteUser", user.DeleteUser)
	admin.POST("/updateUser", user.UpdateUser)
	admin.GET("/users", user.GetAllUsers)

	admin.POST("/producto", productos.CreateProduct)
	admin.POST("/deleteProduct", productos.DeleteProduct)
	admin.GET("/producto", productos.GetProduct)
	admin.GET("/productos", productos.GetAllProducts)

	admin.GET("/feedback", feedback.Get)
	admin.POST("/deleteFeedback", feedback.Delete)
	admin.GET("/feedbacks", feedback.GetAll)

	admin.GET("/pedido", pedido.GetPedido)
	admin.GET("/pedidos", pedido.GetAllPedidos)
	admin.POST("/deletePedido", pedido.DeletePedido)

	admin.GET("/subscriptores", subscripcion.All)
	admin.POST("/notify", notification.All)

	// Iniciar el servidor
	e.Logger.Fatal(e.Start(":1338"))

	return e
}
