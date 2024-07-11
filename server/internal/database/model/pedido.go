package model

import "time"

type Pedido struct {
	ID               int       `json:"id,omitempty" binding:"required"`
	IdServico        int       `json:"id_servico,omitempty"`
	UserID           int       `json:"user_id,omitempty" binding:"required"`
	Phone            string    `json:"phone,omitempty" binding:"required"`
	Municipio        string    `json:"municipio,omitempty" binding:"required"`
	AddressReference string    `json:"address_reference,omitempty" binding:"required"`
	FechaInicio      time.Time `json:"fecha_inicio,omitempty" binding:"required"`
	FechaCulminacion time.Time `json:"fecha_culminacion,omitempty" binding:"required"`
	Status           string    `json:"status"`
}
