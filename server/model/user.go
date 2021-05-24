package model

import "time"

type EcomUser struct {
	Name      string `json:"name"`
	Email     string `json:"email" gorm:"unique;not null;primaryKey"`
	Role      string `json:"role" gorm:"default:subscriber"`
	Address   string `json:"address"`
	CreatedAt time.Time
	UpdatedAt time.Time
}
