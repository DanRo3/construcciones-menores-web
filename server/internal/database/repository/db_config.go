package repository

import (
	"context"
	"fmt"
	"log"
	"os"

	"github.com/jackc/pgx/v5"
)

var conect *pgx.Conn

func Connect() error {
	pgUrl := "postgres://cliente:rxhmwsmjA*2022@localhost:5432/ingenieria"
	var err error
	conect, err = pgx.Connect(context.Background(), pgUrl)
	if err != nil {
		fmt.Fprintf(os.Stderr, "Unable to connect to database: %v\n", err)
		return err
	}
	return nil
}

func init() {
	if err := Connect(); err != nil {
		log.Fatal(err)
	}
}

func GetConnector() *pgx.Conn {
	return conect
}
