package producto

import (
	"github.com/ProImpact/construccionesMenores/internal/database/model"
	"github.com/ProImpact/construccionesMenores/pkg/validator"
)

type Error = string

type Validator struct {
	Errors []Error
}

func (t *Validator) Validate(prod model.Producto) {
	t.emptyFields(prod)
	if len(t.Errors) > 0 {
		return
	}
	if len(prod.Nombre) > 30 {
		t.Errors = append(t.Errors, "El nombre no debe ser mayor de 30 caracteres")
	}
	if len(prod.Nombre) < 4 {
		t.Errors = append(t.Errors, "El campo del nombre debe tener al menos cuatro caracteres")
	}
	if prod.Precio < 0 {
		t.Errors = append(t.Errors, "El precio no debe contener numeros negativos")
	}
	if !validator.AlfoNumericName(prod.Nombre) {
		t.Errors = append(t.Errors, "El nombre no debe contener caracteres especiales")
	}
}

func (t *Validator) emptyFields(prod model.Producto) {
	if prod.Imgpath == "" {
		t.Errors = append(t.Errors, "Campo de la imagen vacio o no introducido")
	}
	if prod.Nombre == "" {
		t.Errors = append(t.Errors, "Campo del nombre vacio o no introducido")
	}
	if prod.Precio == 0 {
		t.Errors = append(t.Errors, "Campo del precio vacio o no introducido")
	}
}
