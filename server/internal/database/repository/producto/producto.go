package producto

import (
	"context"

	"github.com/ProImpact/construccionesMenores/internal/database/model"
	"github.com/jackc/pgx/v5"
)

func CreateProducto(producto model.Producto, conect *pgx.Conn) error {
	query := "insert into producto(nombre,precio,imgpath) values($1 ,$2 ,$3)"
	if _, err := conect.Exec(context.Background(), query, producto.Nombre, producto.Precio, producto.Imgpath); err != nil {
		return err
	}
	return nil
}

func DeleteProducto(productoID int, conect *pgx.Conn) error {
	query := "delete from producto where id = $1"
	if _, err := conect.Exec(context.Background(), query, productoID); err != nil {
		return err
	}
	return nil
}

func GetProducto(productoID int, conect *pgx.Conn) (model.Producto, error) {
	query := "select nombre,precio,imgpath from producto where id = $1"
	var prod model.Producto
	if err := conect.QueryRow(context.Background(), query, productoID).Scan(
		&prod.Nombre, &prod.Precio, &prod.Imgpath); err != nil {
		return prod, err
	}
	return prod, nil
}

func GetAllProducts(conect *pgx.Conn) ([]model.Producto, error) {
	var users []model.Producto
	query := "select id,nombre,precio,imgpath from producto"
	row, err := conect.Query(context.Background(), query)
	if err != nil {
		return users, err
	}
	defer row.Close()
	for row.Next() {
		var u model.Producto
		if err := row.Scan(&u.Id, &u.Nombre, &u.Precio, &u.Imgpath); err != nil {
			return users, err
		}
		users = append(users, u)
	}
	return users, nil
}
