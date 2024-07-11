package pedido

import (
	"context"
	"fmt"

	"github.com/ProImpact/construccionesMenores/internal/database/model"
	"github.com/jackc/pgx/v5"
)

func CreatePedido(pedido model.Pedido, conn *pgx.Conn) error {
	_, err := conn.Exec(context.Background(), `
        INSERT INTO pedido (idservico, userid, phone, municipio, addressreference, fechainicio, fechaculminacion)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
    `, pedido.IdServico, pedido.UserID, pedido.Phone, pedido.Municipio, pedido.AddressReference, pedido.FechaInicio, pedido.FechaCulminacion)
	if err != nil {
		return fmt.Errorf("error al crear pedido: %v", err)
	}
	return nil
}

func GetPedidoByID(id int64, conn *pgx.Conn) (*model.Pedido, error) {
	var pedido model.Pedido
	row := conn.QueryRow(context.Background(), `
        SELECT idservico, userid, phone, municipio, addressreference, fechainicio, fechaculminacion
        FROM pedido WHERE id = $1
    `, int64(id))
	err := row.Scan(&pedido.IdServico, &pedido.UserID, &pedido.Phone, &pedido.Municipio, &pedido.AddressReference, &pedido.FechaInicio, &pedido.FechaCulminacion)
	if err != nil {
		if err == pgx.ErrNoRows {
			return nil, fmt.Errorf("no se encontró el pedido con ID %d", id)
		}
		return nil, fmt.Errorf("error al obtener pedido: %v", err)
	}
	return &pedido, nil
}

func UpdatePedido(conn *pgx.Conn, id int64, pedido model.Pedido) error {
	_, err := conn.Exec(context.Background(), `
        UPDATE pedido SET idservico = $1, userid = $2, phone = $3, municipio = $4, addressreference = $5, fechainicio = $6, fechaculminacion = $7
        WHERE id = $8
    `, pedido.IdServico, pedido.UserID, pedido.Phone, pedido.Municipio, pedido.AddressReference, pedido.FechaInicio, pedido.FechaCulminacion, id)
	if err != nil {
		return fmt.Errorf("error al actualizar pedido: %v", err)
	}
	return nil
}

func DeletePedido(conn *pgx.Conn, id int64) error {
	_, err := conn.Exec(context.Background(), `
        DELETE FROM pedido WHERE id = $1
    `, id)
	if err != nil {
		return fmt.Errorf("error al eliminar pedido: %v", err)
	}
	return nil
}

func GetAllPedidos(conn *pgx.Conn) ([]model.Pedido, error) {
	var pedidos []model.Pedido
	query := `
		select id,idservico,userid,phone,municipio,addressreference,fechainicio,fechaculminacion
		from "pedido"
	`
	row, err := conn.Query(context.Background(), query)
	if err != nil {
		return pedidos, err
	}
	defer row.Close()
	for row.Next() {
		var p model.Pedido
		if err := row.Scan(&p.ID, &p.IdServico, &p.UserID, &p.Phone, &p.Municipio, &p.AddressReference, &p.FechaInicio, &p.FechaCulminacion); err != nil {
			return pedidos, err
		}
		pedidos = append(pedidos, p)
	}
	return pedidos, nil
}

func AumentarFechadeEntrega(pedido int, conn *pgx.Conn) error {

	return nil
}

func SetMode(mode string, id int, con *pgx.Conn) error {
	query := `
		update "pedido" set
		status = $1
		where  id = $2
	`
	if _, err := con.Exec(context.Background(), query, mode, id); err != nil {
		return err
	}
	return nil
}

func Exists(id int, conn *pgx.Conn) bool {
	query := `
		select count(*) from "pedido" where id = $1
	`
	cant := 0
	if err := conn.QueryRow(context.Background(), query, id).Scan(&cant); err != nil {
		return false
	}
	return cant == 1
}
