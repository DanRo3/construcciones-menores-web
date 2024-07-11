package model

type Email struct {
	UsedId int    `json:"used_id" binding:"requiered"`
	Id     int    `json:"id" binding:"requiered"`
	Mail   string `json:"mail" binding:"requiered"`
	Text   string `json:"text" binding:"requiered"`
}
