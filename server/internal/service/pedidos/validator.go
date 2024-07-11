package pedidos

import (
	"strings"

	"github.com/ProImpact/construccionesMenores/internal/database/model"
	"github.com/ProImpact/construccionesMenores/pkg/validator"
)

type Error = string

type Validator struct {
	Errors []Error
}

func (t *Validator) Validate(pedido model.Pedido) {
	t.emptyFields(pedido)
	if len(t.Errors) > 0 {
		return
	}
	t.validatePhoneNumber(pedido.Phone)
	if !validator.AlfoNumericName(pedido.Municipio) {
		t.Errors = append(t.Errors, "El municipio no debe contener caracteres especiales")
	}
}

func (t *Validator) validatePhoneNumber(number string) {
	t.validCountryCode(number)
	t.validPhoneLength(number)
}

func (t *Validator) validCountryCode(phone string) {
	if !strings.HasPrefix(phone, "+53") {
		t.Errors = append(t.Errors, "codigo de pais incorrecto")
	}
}

func (t *Validator) validPhoneLength(phone string) {
	if len(phone) < 11 {
		t.Errors = append(t.Errors, "numero de telefono con longitud incorrecta")
	}
}

func (t *Validator) emptyFields(pedido model.Pedido) {
	if pedido.AddressReference == "" {
		t.Errors = append(t.Errors, "Direccion de referencia vacia o no introducida")
	}
	if pedido.Municipio == "" {
		t.Errors = append(t.Errors, "Municipio vacio o no introducido")
	}
	if pedido.Phone == "" {
		t.Errors = append(t.Errors, "Numero de telefono no introducido o vacio")
	}
}
