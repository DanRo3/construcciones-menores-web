package validator

import "unicode"

func AlfoNumericName(name string) bool {
	for _, char := range name {
		if !unicode.IsLetter(char) && !unicode.IsDigit(char) && !unicode.IsSpace(char) {
			return false
		}
	}
	return true
}
