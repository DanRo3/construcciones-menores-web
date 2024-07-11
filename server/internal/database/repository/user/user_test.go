package user

import (
	"testing"

	"github.com/ProImpact/construccionesMenores/internal/database/model"
	"github.com/ProImpact/construccionesMenores/internal/database/repository"
)

func TestCreateUser(t *testing.T) {
	user := model.User{
		Name:     "DanRo",
		Email:    "admin@gmail.com",
		Phone:    "5359759974",
		Password: "danro",
		Role:     "admin",
	}
	if err := CreateUser(user, repository.GetConnector()); err != nil {
		t.Fatal(err)
	}
}

func TestGetAllUsers(t *testing.T) {
	users, _ := GetAllUsers(repository.GetConnector())
	t.Log(users)
}

func TestDeleteUser(t *testing.T) {
	id := 5
	if err := DeleteUser(id, repository.GetConnector()); err != nil {
		t.Fatal(err)
	}
}

func TestIsSubscribed(t *testing.T) {
	ok := IsSubscribed(7, repository.GetConnector())
	t.Log(ok)
}
