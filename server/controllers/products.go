package controllers

import (
	"fmt"
	"server/database"
	"server/model"
	"strconv"

	"github.com/gofiber/fiber/v2"
	"github.com/gosimple/slug"
)

func CreateProduct(c *fiber.Ctx) error {

	var data map[string]string
	if err := c.BodyParser(&data); err != nil {
		return err
	}

	fmt.Println("Request Data:", data)
	price, _ := strconv.Atoi(data["price"])
	quantity, _ := strconv.Atoi(data["quantity"])
	categoryId, _ := strconv.Atoi(data["category"])
	subCategoryId, _ := strconv.Atoi(data["subCategory"])

	product := model.Product{
		Title:         data["title"],
		Slug:          slug.Make(data["title"]),
		Description:   data["description"],
		Price:         int32(price),
		Quantity:      int64(quantity),
		Shipping:      data["shipping"],
		Color:         data["color"],
		Brand:         data["brand"],
		CategoryID:    uint(categoryId),
		SubCategoryID: uint(subCategoryId),
	}

	res := database.DB.Create(&product)

	if res.Error != nil {
		fmt.Errorf("error: %v", res.Error)
		c.Status(fiber.StatusBadRequest)
		return c.JSON(fiber.Map{
			"message": res.Error,
		})
	} else {
		return c.JSON(product)
	}

}

func ListProducts(c *fiber.Ctx) error {

	var products []model.Product
	res := database.DB.Order("id desc").Find(&products)

	if res.Error != nil {
		fmt.Errorf("error: %v", res.Error)
		c.Status(fiber.StatusBadRequest)
		return c.JSON(fiber.Map{
			"message": res.Error,
		})
	} else {
		return c.JSON(products)
	}

}
