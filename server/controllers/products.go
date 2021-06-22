package controllers

import (
	"fmt"
	"reflect"
	"server/database"
	"server/model"
	"strconv"

	"github.com/gofiber/fiber/v2"
	"github.com/gosimple/slug"
)

func CreateProduct(c *fiber.Ctx) error {

	var data map[string]interface{}

	if err := c.BodyParser(&data); err != nil {
		return err
	}

	fmt.Println("Request Data:-------->", data["images"])
	images := reflect.ValueOf(data["images"])
	typeof := reflect.TypeOf(data["images"]).Kind()
	fmt.Println("Reflect Value", images)
	fmt.Println("Reflect Type", typeof)

	for i := 0; i < images.Len(); i++ {
		fmt.Println("Interface Data:", images.Index(i).Interface())
	}

	price, _ := strconv.Atoi(data["price"].(string))
	quantity, _ := strconv.Atoi(data["quantity"].(string))
	categoryID, _ := strconv.Atoi(data["category"].(string))
	subCategoryID, _ := strconv.Atoi(data["subCategory"].(string))

	product := model.Product{
		Title:         data["title"].(string),
		Slug:          slug.Make(data["title"].(string)),
		Description:   data["description"].(string),
		Price:         int32(price),
		Quantity:      int64(quantity),
		Shipping:      data["shipping"].(string),
		Color:         data["color"].(string),
		Brand:         data["brand"].(string),
		CategoryID:    uint(categoryID),
		SubCategoryID: uint(subCategoryID),
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
