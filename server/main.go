package main

import (
	"fmt"
	"server/database"
	"server/routes"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/joho/godotenv"
)

func main() {
	fmt.Println("Hello World")
	database.Connect()
	app := fiber.New()

	err := godotenv.Load(".env")

	if err != nil {
		fmt.Errorf("Error loading .env file")
	}

	app.Use(cors.New(cors.Config{
		AllowCredentials: true,
	}))

	routes.Setup(app)

	app.Listen(":8000")

}
