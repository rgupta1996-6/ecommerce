package controllers

import (
	"fmt"
	"server/database"
	"server/model"

	"github.com/gofiber/fiber/v2"
	"github.com/gosimple/slug"
)

//Create a new category........
func Create(c *fiber.Ctx) error {

	var data map[string]string
	if err := c.BodyParser(&data); err != nil {
		return err
	}
	category := model.Category{
		Name: data["name"],
		Slug: slug.Make(data["name"]),
	}

	res := database.DB.Create(&category)

	if res.Error != nil {
		fmt.Errorf("error: %v", res.Error)
		c.Status(fiber.StatusBadRequest)
		return c.JSON(fiber.Map{
			"message": res.Error,
		})
	} else {
		return c.JSON(category)
	}
}

//Update the name and slug of the existing category.....
func Update(c *fiber.Ctx) error {

	var data map[string]string
	var category model.Category
	categorySlug := c.Params("slug")

	if err := c.BodyParser(&data); err != nil {
		return err
	}

	name := data["name"]
	slug := slug.Make(name)

	res := database.DB.Model(&category).Where("slug=?", categorySlug).Updates(map[string]interface{}{"name": name, "slug": slug})

	if res.Error != nil {
		fmt.Errorf("error: %v", res.Error)
		c.Status(fiber.StatusBadRequest)
		return c.JSON(fiber.Map{
			"message": res.Error,
		})
	} else {
		return c.JSON(fiber.Map{
			"message": "success",
		})
	}
}

//Delete a category permanently .........
func Delete(c *fiber.Ctx) error {
	categorySlug := c.Params("slug")
	var category model.Category

	fmt.Println(categorySlug)

	res := database.DB.Unscoped().Where("slug=?", categorySlug).Delete(&category)

	if res.Error != nil {
		fmt.Errorf("error: %v", res.Error)
		c.Status(fiber.StatusBadRequest)
		return c.JSON(fiber.Map{
			"message": res.Error,
		})
	} else {
		return c.JSON(fiber.Map{
			"message": "success",
		})
	}
}

//Read a category based on the slug received in the url........
func Read(c *fiber.Ctx) error {
	categorySlug := c.Params("slug")
	var category model.Category
	res := database.DB.Preload("SubCategories").Where("slug=?", categorySlug).Find(&category)

	if res.Error != nil {
		fmt.Errorf("error: %v", res.Error)
		c.Status(fiber.StatusBadRequest)
		return c.JSON(fiber.Map{
			"message": res.Error,
		})
	} else {
		return c.JSON(category)
	}
}

//List all the categories .............
func List(c *fiber.Ctx) error {
	var categories []model.Category
	res := database.DB.Preload("SubCategories").Order("id desc").Find(&categories)

	if res.Error != nil {
		fmt.Errorf("error: %v", res.Error)
		c.Status(fiber.StatusBadRequest)
		return c.JSON(fiber.Map{
			"message": res.Error,
		})
	} else {
		return c.JSON(categories)
	}
}
