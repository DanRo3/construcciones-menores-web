package auth

import (
	"testing"
)

func TestVerifyToken(t *testing.T) {
	token := "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRob3JpemVkIjp0cnVlLCJleHAiOjE3MTcwMzUwMzIsInJvbGUiOiJ1c2VyIiwidXNlciI6Mn0.e6dnagoxWoj4G-B25FlSCjmTH9CTwWwSjoPbeq0PkRY"
	if data, err := VerifyToken(token); err != nil {
		t.Fatal(err)
	} else {
		t.Log(data)
	}
}

func TestGenerateApiKey(t *testing.T) {
	t.Log(GenerateApiKey())
}

func TestGenerateJWTToken(t *testing.T) {
	token, err := GenerateJWTToken(2, "user")
	if err != nil {
		t.Fatal(err)
		t.Log(token)
	} else {
		t.Log(token)
	}
}
