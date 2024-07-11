package subscripcion

import (
	"testing"

	"github.com/ProImpact/construccionesMenores/internal/database/model"
	"github.com/ProImpact/construccionesMenores/internal/database/repository"
)

func TestXxx(t *testing.T) {
	err := Create(repository.GetConnector(), model.Subscripcion{
		Mail: "jose@email.com",
	})
	if err != nil {
		t.Fatal(err)
	}
}
