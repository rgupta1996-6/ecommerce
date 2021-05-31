package model

import (
	"gorm.io/gorm"
)

type Category struct {
	gorm.Model
	Name          string `json:"name" gorm:"unique;not null"` // check max length=32 and min length = 3
	Slug          string `json:"slug" gorm:"unique"`          // convert it to lowercase
	SubCategories []SubCategory
	Products      []Product
}

type SubCategory struct {
	gorm.Model
	Name       string `json:"name" gorm:"not null"`
	Slug       string `json:"slug" gorm:"not null"`
	CategoryID uint   `json:"id" gorm:"not null"`
	Products   []Product
}

type Product struct {
	gorm.Model
	Title         string `json:"title" gorm:"not null"`
	Slug          string `json:"slug" gorm:"unique"`
	Description   string `json:"desc" gorm:"not null"`
	Price         int32  `json:"price" gorm:"not null"`
	CategoryID    uint   `json:"id" gorm:"not null"`
	SubCategoryID uint   `json:"subid" gorm:"not null"`
	//SubCategories []SubCategory `gorm:"many2many:product_subcategories"`
	Quantity int64 `json:"quantity"`
	Sold     int64 `json:"sold" gorm:"default:0"`
	//Images        []Image       `json:"image"`
	Shipping string `json:"shipping"`
	Color    string `json:"color"`
	Brand    string `json:"brand"`
	//Ratings       []Rating
}

type Image struct {
	gorm.Model
	Image     string `json:"image"`
	ProductID uint   `json:"id" gorm:"not null"`
}

// type Rating struct {
// 	gorm.Model
// 	Star       int  `json:"star"`
// 	ProductID  uint `json:"pid" gorm:"not null"`
// 	EcomUserID uint `json:"id" gorm:"not null"`
// }
