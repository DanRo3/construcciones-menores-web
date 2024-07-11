package model

type Service struct {
	IdServicio  int    `json:"id_servicio" binding:"required"`
	Nombre      string `json:"nombre" binding:"required"`
	Price       int    `json:"price" binding:"required"`
	Descripcion string `json:"descripcion" binding:"required"`
	Img         string `json:"img" binding:"required"`
}
