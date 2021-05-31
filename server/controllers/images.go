package controllers

import (
	"fmt"
	"os"

	"github.com/cloudinary/cloudinary-go"
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

	// var image model.Image

	// cld:= Cloudinary()

	// uplodedImages,err := cld.Upload.Upload()

	return nil
}

func RemoveImage(c *fiber.Ctx) error {

	return nil
}
