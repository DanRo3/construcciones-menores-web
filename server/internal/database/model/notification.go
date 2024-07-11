package model

type Notification struct {
	Id     int    `json:"id"`
	UserId int    `json:"user_id,omitempty"`
	Text   string `json:"text,omitempty"`
}
