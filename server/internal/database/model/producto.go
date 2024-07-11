package model

type Producto struct {
	Id      int    `json:"id,omitempty"`
	Nombre  string `json:"name,omitempty"`
	Precio  int    `json:"price,omitempty"`
	Imgpath string `json:"imgpath,omitempty"`
}
