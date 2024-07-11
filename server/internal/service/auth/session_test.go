package auth

import "testing"

func TestSecurePassword(t *testing.T) {
	data := SecurePassword("123123123")
	t.Log(data)
}
