package controllers

import (
	"fmt"
	"server/database"
	"server/model"
	"strconv"

	"github.com/gofiber/fiber/v2"
	"github.com/gosimple/slug"
)

//Create a new category........
func CreateSub(c *fiber.Ctx) error {

	var data map[string]string
	if err := c.BodyParser(&data); err != nil {
		return err
	}
	id, _ := strconv.ParseUint(data["id"], 10, 32)
	category := model.SubCategory{
		Name:       data["name"],
		Slug:       slug.Make(data["name"]),
		CategoryID: uint(id),
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
func UpdateSub(c *fiber.Ctx) error {

	var data map[string]string
	var category model.SubCategory
	categorySlug := c.Params("slug")

	if err := c.BodyParser(&data); err != nil {
		return err
	}

	name := data["name"]
	slug := slug.Make(name)
	id, _ := strconv.ParseUint(data["id"], 10, 32)

	res := database.DB.Model(&category).Where("slug=?", categorySlug).Updates(map[string]interface{}{"name": name, "slug": slug, "category_id": id})

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
func DeleteSub(c *fiber.Ctx) error {

	categorySlug := c.Params("slug")
	var category model.SubCategory

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
func ReadSub(c *fiber.Ctx) error {

	categorySlug := c.Params("slug")

	var category model.SubCategory

	res := database.DB.Where("slug=?", categorySlug).Find(&category)

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
func ListSub(c *fiber.Ctx) error {
	var categories []model.SubCategory
	res := database.DB.Order("id desc").Find(&categories)

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
