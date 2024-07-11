package repository

import "testing"

func TestConection(t *testing.T) {
	if err := Connect(); err != nil {
		t.Fatal(err)
	}
}
