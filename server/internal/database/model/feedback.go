package model

import "time"

type Estado = string

const (
	Leido    = "leido"
	NoLeido  = "no_leido"
	Atendido = "atendido"
)

type FeedBack struct {
	Id       int       `json:"id,omitempty"`
	UserName string    `json:"user_name,omitempty"`
	Email    string    `json:"email,omitempty"`
	Message  string    `json:"message,omitempty"`
	Created  time.Time `json:"created,omitempty"`
	Estado   string    `json:"estado,omitempty"`
}
