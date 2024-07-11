package notification

import "github.com/ProImpact/construccionesMenores/internal/database/model"

type Error = string

type Validator struct {
	Errors []Error
}

func (t *Validator) Validate(not model.Notification) bool {
	t.emptyFields(not)
	if len(t.Errors) > 0 {
		return false
	}
	return true
}

func (t *Validator) emptyFields(not model.Notification) {
	if not.Text == "" {
		t.Errors = append(t.Errors, "texto de la notificacion no introducido o esta vacio")
	}
	if not.UserId == 0 {
		t.Errors = append(t.Errors, "id de usuario no resivido")
	}
}
