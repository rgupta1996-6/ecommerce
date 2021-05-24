package routes

import (
	"server/controllers"
	"server/middleware"

	"github.com/gofiber/fiber/v2"
)

func Setup(app *fiber.App) {

	app.Use("/api", middleware.Auth)
	app.Use("/admin", middleware.Auth, middleware.AdminCheck)
	app.Post("/api/app", controllers.CreateOrUpdateUser)
	app.Post("/api/currentuser", controllers.CurrentUser)
	app.Post("/admin/current-admin", controllers.CurrentUser)
}
