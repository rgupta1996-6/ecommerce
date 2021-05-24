package middleware

import (
	"context"
	"fmt"
	"server/database"
	"server/firebase"
	"server/model"

	"firebase.google.com/go/v4/auth"
	"github.com/gofiber/fiber/v2"
)

var AuthToken *auth.Token

func Auth(c *fiber.Ctx) error {

	fmt.Println("I am a middleware")
	var data map[string]string

	if err := c.BodyParser(&data); err != nil {
		return err
	}
	fmt.Println(data)

	app, _ := firebase.ServiceAccount()
	client, err := app.Auth(context.Background())

	if err != nil {
		fmt.Errorf("Error: %v", err)
		return c.JSON(fiber.Map{
			"message": "invalid or expired token",
		})
	}
	fmt.Println("authToken data :", data["authToken"])
	authToken, _ := client.VerifyIDToken(context.Background(), data["authToken"])

	AuthToken = authToken

	return c.Next()

}

func AdminCheck(c *fiber.Ctx) error {
	fmt.Println("I am admin check middleware")
	userData := AuthToken.Claims
	var user model.EcomUser

	database.DB.Where("email = ?", userData["email"]).First(&user)
	fmt.Println("Admin:", user)

	if user.Role == "admin" {
		return c.Next()
	} else {
		c.Status(fiber.StatusUnauthorized)
		return c.JSON(fiber.Map{
			"message": "Admin Resource. Access Denied!!!",
		})
	}

}
