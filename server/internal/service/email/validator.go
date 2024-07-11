package email

import (
	"github.com/ProImpact/construccionesMenores/internal/database/model"
	"github.com/ProImpact/construccionesMenores/pkg/validator"
)

type Error = string

type Validator struct {
	Errors []Error
}

func (t *Validator) Validate(emial model.Email) bool {
	t.emptyFilds(emial)
	if err := validator.ValidateEmail(emial.Mail); err != nil {
		t.Errors = append(t.Errors, err.Error())
	}
	return false
}

func (t *Validator) emptyFilds(email model.Email) {
	if email.Mail == "" {
		t.Errors = append(t.Errors, "Campo del email no introducido o vacio")
	}
	if email.Text == "" {
		t.Errors = append(t.Errors, "Campo del texto no introducido o vacio")
	}
}
