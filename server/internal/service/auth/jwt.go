package auth

import (
	"crypto/sha256"
	"encoding/hex"
	"fmt"
	"math/rand"
	"net/http"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

// generado con el metodo GenerateApiKey()
var _API_KEY = []byte("cc61ad1_75b2+19b2160f3d563c363dbe3)ed4b6895fe8a1e%28ec24280cf28@7fcdc4")

func GenerateApiKey() string {
	const letterBytes = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
	randFunc := func(n int) string {
		b := make([]byte, n)
		for i := range b {
			b[i] = letterBytes[rand.Intn(len(letterBytes))]
		}
		return string(b)
	}
	data := []byte(randFunc(20))
	encripted := sha256.Sum256(data)
	data = []byte(hex.EncodeToString(encripted[:]))
	return string(data)
}

func SecurePassword(password string) string {
	encripted := sha256.Sum256([]byte(password))
	return hex.EncodeToString(encripted[:])
}

func GenerateJWTToken(id int, role string) (string, error) {
	token := jwt.New(jwt.SigningMethodHS256)
	claims := token.Claims.(jwt.MapClaims)
	claims["authorized"] = true
	claims["user"] = id
	claims["role"] = role
	claims["exp"] = time.Now().Add(time.Minute * 10000).Unix()
	tokenString, err := token.SignedString(_API_KEY)
	if err != nil {
		return "", err
	}
	return tokenString, nil
}

func VerifyToken(token string) (Session, error) {
	var session Session
	data, err := jwt.Parse(
		token,
		func(token *jwt.Token) (interface{}, error) {
			if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
				return nil, fmt.Errorf("there was an error")
			}
			return _API_KEY, nil
		},
	)
	if err != nil {
		return session, err
	}
	if !data.Valid {
		return session, fmt.Errorf("the token is not valid")
	}
	claims, ok := data.Claims.(jwt.MapClaims)
	if ok && data.Valid {
		userID := int(claims["user"].(float64))
		role := claims["role"].(string)
		session.Role = role
		session.UserId = userID
		return session, nil
	}
	return session, nil
}

func GetRole(w http.ResponseWriter, r *http.Request) string {
	cok, _ := r.Cookie("session")
	sess, err := VerifyToken(cok.Value)
	if err != nil {
		return ""
	}
	return sess.Role
}
