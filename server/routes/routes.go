package routes

import (
	"server/controllers"
	"server/middleware"

	"github.com/gofiber/fiber/v2"
)

func Setup(app *fiber.App) {
	//middlewares
	app.Use("/api", middleware.Auth)
	app.Use("/admin", middleware.Auth, middleware.AdminCheck)
	//routes
	app.Post("/api/app", controllers.CreateOrUpdateUser)
	app.Post("/api/currentuser", controllers.CurrentUser)
	app.Post("/admin/current-admin", controllers.CurrentUser)
	app.Post("/admin/category", controllers.Create)
	app.Get("/category/:slug", controllers.Read)
	app.Get("/categories", controllers.List)
	app.Put("/admin/category/:slug", controllers.Update)
	app.Post("/admin/category/delete/:slug", controllers.Delete)

	//routes for sub categories
	app.Post("/admin/subcategory", controllers.CreateSub)
	app.Get("/subcategory/:slug", controllers.ReadSub)
	app.Get("/subcategories", controllers.ListSub)
	app.Put("/admin/subcategory/:slug", controllers.UpdateSub)
	app.Post("/admin/subcategory/delete/:slug", controllers.DeleteSub)

	//routes for products
	app.Post("/admin/product", controllers.CreateProduct)
	app.Get("/products", controllers.ListProducts)

	//routes for images
	app.Post("/admin/uploadimages", controllers.UploadImages)
	app.Post("/admin/removeimage", controllers.RemoveImage)

}
