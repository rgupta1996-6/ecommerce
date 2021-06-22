package controllers

import (
	"context"
	"fmt"
	"os"

	"github.com/cloudinary/cloudinary-go"
	"github.com/cloudinary/cloudinary-go/api/uploader"
	"github.com/gofiber/fiber/v2"
)

func Cloudinary() *cloudinary.Cloudinary {

	cld, err := cloudinary.NewFromParams(os.Getenv("CLOUDINARY_CLOUD_NAME"), os.Getenv("CLOUDINARY_API_KEY"), os.Getenv("CLOUDINARY_API_SECRET"))

	if err != nil {
		fmt.Errorf("Error while configuring cloudinary!!!")
	}

	return cld
}

func UploadImages(c *fiber.Ctx) error {

	var data map[string]string

	if err := c.BodyParser(&data); err != nil {
		return err
	}

	cld := Cloudinary()
	resp, err := cld.Upload.Upload(context.Background(), data["image"], uploader.UploadParams{})

	fmt.Println("Response from cloudinary: ", resp)

	if err != nil {
		fmt.Errorf("error: %v", resp.Error)
		c.Status(fiber.StatusBadRequest)
		return c.JSON(fiber.Map{
			"message": resp.Error,
		})

	} else {
		return c.JSON(resp)
	}

}

func RemoveImage(c *fiber.Ctx) error {

	var data map[string]string

	if err := c.BodyParser(&data); err != nil {
		return err
	}

	cld := Cloudinary()
	resp, err := cld.Upload.Destroy(context.Background(), uploader.DestroyParams{PublicID: data["id"]})

	fmt.Println("Response from cloudinary: ", resp)

	if err != nil {
		fmt.Errorf("error: %v", resp.Error)
		c.Status(fiber.StatusBadRequest)
		return c.JSON(fiber.Map{
			"message": resp.Error,
		})

	} else {
		return c.JSON(resp)
	}
}
