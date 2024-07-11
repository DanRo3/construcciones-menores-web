package servicios

import (
	"github.com/ProImpact/construccionesMenores/internal/database/model"
	"github.com/ProImpact/construccionesMenores/pkg/validator"
)

type Error = string

type Validator struct {
	Errors []Error
}

func (t *Validator) Validate(service model.Service) {
	t.emptyFields(service)
	if len(t.Errors) > 0 {
		return
	}
	if !validator.AlfoNumericName(service.Nombre) {
		t.Errors = append(t.Errors, "El nombre contiene caracteres alfonumericos")
	}
	if len(service.Nombre) < 4 {
		t.Errors = append(t.Errors, "El nombre debe tener al menos 4 caracteres")
	}
}

func (t *Validator) emptyFields(service model.Service) {
	if service.Descripcion == "" {
		t.Errors = append(t.Errors, "Campo de la descripcion vacio")
	}
	if service.Nombre == "" {
		t.Errors = append(t.Errors, "Campo del nombre vacio")
	}
	if service.Img == "" {
		t.Errors = append(t.Errors, "Campo de la imagen vacio")
	}
	if service.Price == 0 {
		t.Errors = append(t.Errors, "Campo de la precio vacio")
	}
}
