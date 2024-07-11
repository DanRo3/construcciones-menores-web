package notification

import (
	"context"
	"errors"
	"fmt"
	"log"

	"github.com/ProImpact/construccionesMenores/internal/database/model"
	"github.com/jackc/pgx/v5"
)

func CreateNotification(conn *pgx.Conn, notification model.Notification) error {
	table, err := conn.Exec(context.Background(), `
        INSERT INTO "notification" (userid, texto)
        VALUES ($1, $2)
    `, notification.UserId, notification.Text)
	if err != nil {
		return fmt.Errorf("error al crear notificación: %v", err)
	}
	if table.RowsAffected() == 0 {
		return errors.New("error de insercion")
	}
	return nil
}

func GetNotificationByUserID(conn *pgx.Conn, userID int64) ([]model.Notification, error) {
	query := `
        SELECT id,texto FROM "notification" WHERE userid = $1 and visto = false
    `
	notification := []model.Notification{}
	row, err := conn.Query(context.Background(), query, userID)
	if err != nil {
		return notification, err
	}
	defer row.Close()
	for row.Next() {
		var n model.Notification
		if err := row.Scan(&n.Id, &n.Text); err != nil {
			return notification, err
		}
		notification = append(notification, n)
	}
	return notification, nil
}

func GetCantidadByUserID(conn *pgx.Conn, userID int64) (int, error) {
	var notification int
	row := conn.QueryRow(context.Background(), `
        SELECT count(*) FROM notification WHERE userid = $1 and visto = false
    `, userID)
	err := row.Scan(&notification)
	if err != nil {
		if err == pgx.ErrNoRows {
			return 0, fmt.Errorf("no se encontró la notificación para el userID %d", userID)
		}
		return 0, fmt.Errorf("error al obtener notificación: %v", err)
	}
	return notification, nil
}

func DeleteNotification(userID int, conn *pgx.Conn) error {
	_, err := conn.Exec(context.Background(), `
        DELETE FROM "notification" WHERE id = $1
    `, userID)
	if err != nil {
		return fmt.Errorf("error al eliminar notificación: %v", err)
	}
	return nil
}

func SetVisto(notificationId int, conn *pgx.Conn) error {
	query := `
		update "notification" set
		visto = true where id = $1
	`
	if _, err := conn.Exec(context.Background(), query, notificationId); err != nil {
		return err
	}
	return nil
}

func Notify(message string, conn *pgx.Conn) error {
	query := `
		select id from "user" where email in 
		(select email from  "subscripcion")
	`
	var userId []int
	row, err := conn.Query(context.Background(), query)
	if err != nil {
		return err
	}
	defer row.Close()
	for row.Next() {
		var id int
		if err := row.Scan(&id); err != nil {
			return err
		}
		log.Println("Usuarios que seran notificados", id)
		userId = append(userId, id)
	}
	for _, id := range userId {
		notification := model.Notification{
			UserId: id,
			Text:   message,
		}
		if err := CreateNotification(conn, notification); err != nil {
			return err
		}
	}
	return nil

}
