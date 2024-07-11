package subscripcion

import (
	"context"
	"errors"
	"fmt"

	"github.com/ProImpact/construccionesMenores/internal/database/model"
	"github.com/jackc/pgx/v5"
)

func Create(conn *pgx.Conn, subscripcion model.Subscripcion) error {
	_, err := conn.Exec(context.Background(), `
        INSERT INTO subscripcion (email)
        VALUES ($1)
    `, subscripcion.Mail)
	if err != nil {
		return err
	}
	return nil
}

func GetByID(conn *pgx.Conn, id int64) (*model.Subscripcion, error) {
	var subscripcion model.Subscripcion
	row := conn.QueryRow(context.Background(), `
        SELECT id, email FROM subscripcion WHERE id = $1
    `, id)
	err := row.Scan(&subscripcion.Id, &subscripcion.Mail)
	if err != nil {
		if err == pgx.ErrNoRows {
			return nil, fmt.Errorf("no se encontró la suscripción con ID %d", id)
		}
		return nil, fmt.Errorf("error al obtener suscripción: %v", err)
	}
	subscripcion.Id = int(id)
	return &subscripcion, nil
}

func Eliminar(id int, conn *pgx.Conn) error {
	query := `delete
	 from "subscripcion" where id = $1
	`
	if _, err := conn.Exec(context.Background(), query, id); err != nil {
		return err
	}
	return nil
}

func AllSubscriptores(conn *pgx.Conn) ([]model.Subscripcion, error) {
	query := `select id,email
	 from "subscripcion"
	`
	var subscripciones []model.Subscripcion
	row, err := conn.Query(context.Background(), query)
	if err != nil {
		return subscripciones, err
	}
	defer row.Close()
	for row.Next() {
		var a model.Subscripcion
		if err := row.Scan(&a.Id, &a.Mail); err != nil {
			return subscripciones, err
		}
		subscripciones = append(subscripciones, a)
	}
	return subscripciones, nil
}

func IsSubs(conn *pgx.Conn) (bool, error) {
	query := `select count(*) "subscripcion"`
	cant := 0
	if err := conn.QueryRow(context.Background(), query).Scan(&cant); err != nil {
		return false, err
	}
	if cant != 1 {
		return false, errors.New("no se encontro subscriptor")
	}
	return true, nil
}
