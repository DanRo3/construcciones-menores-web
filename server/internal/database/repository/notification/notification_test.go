package notification

import (
	"testing"

	"github.com/ProImpact/construccionesMenores/internal/database/repository"
)

func TestCantidadDeNotificaiones(t *testing.T) {
	cant, err := GetCantidadByUserID(repository.GetConnector(), 7)
	if err != nil {
		t.Fatal(err)
	} else {
		t.Log(cant)
	}
	t.Log(cant)
}

func TestNotify(t *testing.T) {
	if err := Notify("Rebaja de productos proximamanete", repository.GetConnector()); err != nil {
		t.Fatal(err)
	}
}
