package validator

import (
	"net/mail"

	passwordvalidator "github.com/wagslane/go-password-validator"
)

func ValidatePassword(password string) (int, error) {
	entropy := passwordvalidator.GetEntropy(password)
	const minEntropyBits = 60
	err := passwordvalidator.Validate(password, minEntropyBits)
	return int(entropy), err
}

func ValidateEmail(email string) error {
	_, err := mail.ParseAddress(email)
	if err != nil {
		return err
	}
	return nil
}
