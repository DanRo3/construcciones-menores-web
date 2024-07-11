package servicio

import (
	"context"

	"github.com/ProImpact/construccionesMenores/internal/database/model"
	"github.com/jackc/pgx/v5"
)

func CreateServicio(servicio model.Service, conect *pgx.Conn) error {
	query := "insert into servicio(nombre,price,descripcion,imgpath) values($1 ,$2 ,$3 ,$4)"
	if _, err := conect.Exec(context.Background(), query, servicio.Nombre, servicio.Price, servicio.Descripcion, servicio.Img); err != nil {
		return err
	}
	return nil
}

func DeleteServicio(productoID int, conect *pgx.Conn) error {
	query := "delete from servicio where id = $1"
	if _, err := conect.Exec(context.Background(), query, productoID); err != nil {
		return err
	}
	return nil
}

func GetServicio(productoID int, conect *pgx.Conn) (model.Service, error) {
	query := "select id,nombre,price,descripcion,imgpath from servicio where id = $1"
	var prod model.Service
	if err := conect.QueryRow(context.Background(), query, productoID).Scan(
		&prod.IdServicio, &prod.Nombre, &prod.Price, &prod.Descripcion, &prod.Img); err != nil {
		return prod, err
	}
	return prod, nil
}

func GetAllServices(conect *pgx.Conn) ([]model.Service, error) {
	var users []model.Service
	query := "select id,nombre,price,descripcion,imgpath from servicio"
	row, err := conect.Query(context.Background(), query)
	if err != nil {
		return users, err
	}
	defer row.Close()
	for row.Next() {
		var u model.Service
		if err := row.Scan(&u.IdServicio, &u.Nombre, &u.Price, &u.Descripcion, &u.Img); err != nil {
			return users, err
		}
		users = append(users, u)
	}
	return users, nil
}

func Exists(id int, conn *pgx.Conn) bool {
	query := `
		select count(*) from "servicio" where id = $1
	`
	cant := 0
	if err := conn.QueryRow(context.Background(), query, id).Scan(&cant); err != nil {
		return false
	}
	return cant == 1
}
