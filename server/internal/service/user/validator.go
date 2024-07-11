package user

import (
	"net/mail"
	"strings"
	"unicode"

	"github.com/ProImpact/construccionesMenores/internal/database/model"

	passwordvalidator "github.com/wagslane/go-password-validator"
)

type UserValidaor struct {
	Errors []string `json:"errors"`
}

func (t *UserValidaor) Validate(user model.User) {
	t.emptyFields(user)
	if len(t.Errors) > 0 {
		return
	}
	t.validateUserName(user.Name)
	t.validateEmail(user.Email)
	t.validatePhoneNumber(user.Phone)
	t.validatePassword(user.Password)
	if len(t.Errors) > 0 {
		return
	}
}

func (t *UserValidaor) emptyFields(user model.User) {
	if user.Name == "" {
		t.Errors = append(t.Errors, "campo del nombre no introducido o vacio")
	}
	if user.Email == "" {
		t.Errors = append(t.Errors, "campo del email no introducido o vacio")
	}
	if user.Password == "" {
		t.Errors = append(t.Errors, "campo del password no introducido o vacio")
	}
	if user.Phone == "" {
		t.Errors = append(t.Errors, "campo del telefono no introducido o vacio")
	}
}

func (t *UserValidaor) validatePassword(password string) {
	if _, err := ValidatePassword(password); err != nil {
		t.push(err)
	}
}

func ValidatePassword(password string) (int, error) {
	entropy := passwordvalidator.GetEntropy(password)
	const minEntropyBits = 60
	err := passwordvalidator.Validate(password, minEntropyBits)
	return int(entropy), err
}

func (t *UserValidaor) validatePhoneNumber(number string) {
	t.validCountryCode(number)
	t.validPhoneLength(number)
}

func (t *UserValidaor) push(err error) {
	t.Errors = append(t.Errors, err.Error())
}

func (t *UserValidaor) validateUserName(name string) {
	if len(name) < 5 {
		t.Errors = append(t.Errors, "nombre con logitud incorrecta")
	}
	if AlfoNumericName(name) {
		t.Errors = append(t.Errors, "nombre no debe contener caracteres especiales")
	}
	if !StartWithLetter(name) {
		t.Errors = append(t.Errors, "nombre debe iniciar con un caracter")
	}
}

func (t *UserValidaor) validateEmail(email string) {
	_, err := mail.ParseAddress(email)
	if err != nil {
		t.push(err)
	}
}

func (t *UserValidaor) validCountryCode(phone string) {
	if !strings.HasPrefix(phone, "+53") {
		t.Errors = append(t.Errors, "codigo de pais incorrecto")
	}
}

func (t *UserValidaor) validPhoneLength(phone string) {
	if len(phone) < 11 {
		t.Errors = append(t.Errors, "numero de telefono con longitud incorrecta")
	}
}

func AlfoNumericName(name string) bool {
	for char := range name {
		if unicode.IsLetter(rune(char)) || unicode.IsDigit(rune(char)) {
			continue
		} else {
			return false
		}
	}
	return true
}

func StartWithLetter(name string) bool {
	return unicode.IsLetter(rune(name[0]))
}
