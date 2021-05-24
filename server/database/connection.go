package database

import (
	"fmt"
	"server/model"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var DB *gorm.DB

func Connect() {

	connection, err := gorm.Open(mysql.Open("root:Current-Root-Password@tcp(localhost:3306)/sys?parseTime=true"), &gorm.Config{})

	if err != nil {
		fmt.Errorf("Could not connect to database")
	}
	fmt.Println("Connected to database")
	DB = connection
	connection.AutoMigrate(&model.EcomUser{})

}
