package main

import (
	"log"

	router "github.com/ProImpact/construccionesMenores/api"
)

func main() {
	if err := router.CreateRouter(); err != nil {
		log.Fatal("Server error")
	}

}
