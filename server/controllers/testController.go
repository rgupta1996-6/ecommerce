package controllers

import (
	"fmt"

	"server/database"
	"server/middleware"
	"server/model"

	"github.com/gofiber/fiber/v2"
)

type Response struct {
	Message string `json:"message"`
}

func CreateOrUpdateUser(c *fiber.Ctx) error {

	fmt.Println("I am the main function!!!")

	userData := middleware.AuthToken.Claims

	user := model.EcomUser{
		Name:    userData["name"].(string),
		Email:   userData["email"].(string),
		Address: "xyz lane,India",
	}
	updatedUser := model.EcomUser{}
	res := database.DB.Create(&user)

	if res.Error != nil {
		database.DB.Where("email=?", userData["email"]).First(&updatedUser)
		fmt.Println("User Updated", updatedUser)
		return c.JSON(updatedUser)
	}
	fmt.Println("User Created", user)
	return c.JSON(user)

}

func CurrentUser(c *fiber.Ctx) error {

	user := model.EcomUser{}
	userData := middleware.AuthToken.Claims
	email := userData["email"]
	// Get first matched record
	res := database.DB.Where("email = ?", email).First(&user)

	if res.Error != nil {
		fmt.Errorf("error: %v", res.Error)
		c.Status(fiber.StatusBadRequest)
		return c.JSON(fiber.Map{
			"message": "user not found",
		})
	} else {
		fmt.Println(user)
		return c.JSON(user)
	}

}
