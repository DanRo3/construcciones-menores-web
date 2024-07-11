package feedback

import (
	"github.com/ProImpact/construccionesMenores/internal/database/model"
	"github.com/ProImpact/construccionesMenores/pkg/validator"
)

type Error = string

type Validator struct {
	Errors []Error
}

func (t *Validator) Validate(feed model.FeedBack) {
	t.EmptyFields(feed)
	if len(t.Errors) > 0 {
		return
	}
	if len(feed.UserName) < 4 {
		t.Errors = append(t.Errors, "Campo del nombre del usuario menor de 4")
	}
	if err := validator.ValidateEmail(feed.Email); err != nil {
		t.Errors = append(t.Errors, err.Error())
	}
}

func (t *Validator) EmptyFields(feed model.FeedBack) {
	if feed.Email == "" {
		t.Errors = append(t.Errors, "Campo del email no introducido o vacio")
	}
	if feed.Message == "" {
		t.Errors = append(t.Errors, "Campo del mensaje no introducido o vacio")
	}
	if feed.UserName == "" {
		t.Errors = append(t.Errors, "Campo del nombre del usuario no introducido")
	}
}
