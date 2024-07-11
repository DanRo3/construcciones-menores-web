package user

import (
	"context"
	"errors"

	"github.com/ProImpact/construccionesMenores/internal/database/model"
	"github.com/ProImpact/construccionesMenores/internal/service/auth"
	"github.com/jackc/pgx/v5"
	"github.com/labstack/gommon/log"
)

func CreateUser(user model.User, conect *pgx.Conn) error {
	query := `insert into "user" (name,email,phone,password) values($1 ,$2 ,$3 ,$4)`
	if user.Name == "admin" || user.Name == "root" || user.Name == "master" {
		return errors.New("nombre no permitido, usado en administracion")
	}
	if _, err := conect.Exec(context.Background(), query, user.Name, user.Email, user.Phone, auth.SecurePassword(user.Password)); err != nil {
		return err
	}
	return nil
}

func DeleteUser(userId int, conect *pgx.Conn) error {
	query := `delete from "user" where id = $1`
	if _, err := conect.Exec(context.Background(), query, userId); err != nil {
		return err
	}
	return nil
}

func GetUser(userId int, conect *pgx.Conn) (model.User, error) {
	query := `select name,email,phone,password,role from "user" where id = $1`
	var user model.User
	if err := conect.QueryRow(context.Background(), query, userId).Scan(
		&user.Name, &user.Email, &user.Phone, &user.Password, &user.Role); err != nil {
		return user, err
	}
	return user, nil
}

func GetUserByName(name string, conect *pgx.Conn) (model.User, error) {
	query := `select name,email,phone,password,role from "user" where name = $1`
	var user model.User
	if err := conect.QueryRow(context.Background(), query, name).Scan(
		&user.Name, &user.Email, &user.Phone, &user.Password, &user.Role); err != nil {
		return user, err
	}
	return user, nil
}

func GetAllUsers(conect *pgx.Conn) ([]model.User, error) {
	var users []model.User
	query := `select id,name,email,phone,password,role from "user"`
	row, err := conect.Query(context.Background(), query)
	if err != nil {
		return users, err
	}
	defer row.Close()
	for row.Next() {
		var u model.User
		if err := row.Scan(&u.ID, &u.Name, &u.Email, &u.Phone, &u.Password, &u.Role); err != nil {
			return users, err
		}
		users = append(users, u)
	}
	return users, nil
}

func WithEmail(email string, conn *pgx.Conn) (model.User, error) {
	query := `
	select id,name,email,phone,password,role from "user"
	where email = $1
	`
	var u model.User
	if err := conn.QueryRow(context.Background(),
		query, email).Scan(&u.ID, &u.Name, &u.Email, &u.Phone, &u.Password, &u.Role); err != nil {
		return u, err
	}
	return u, nil
}

func UpdateInfo(user model.User, conn *pgx.Conn) error {
	query := `
		update "user" set 
		name = $1,
		email = $2,
		phone = $3,
		password = $4
		where id = $5
	`
	if user.Name == "admin" || user.Name == "root" || user.Name == "master" {
		return errors.New("nombre no permitido, usado en administracion")
	}
	if _, err := conn.Exec(context.Background(), query, user.Name, user.Email, user.Phone, auth.SecurePassword(user.Password), user.ID); err != nil {
		return err
	}
	return nil
}

func Exists(id int, conn *pgx.Conn) bool {
	query := `
		select count(*) from "user" where id = $1
	`
	cant := 0
	if err := conn.QueryRow(context.Background(), query, id).Scan(&cant); err != nil {
		return false
	}
	return cant == 1
}

func IsSubscribed(id int, conn *pgx.Conn) bool {
	query := `
		select count(*) from "subscripcion" a, "user" b  where a.email = b.email and b.id = $1;
	`
	cant := 0
	if err := conn.QueryRow(context.Background(), query, id).Scan(&cant); err != nil {
		log.Error(err)
		return false
	}
	return cant == 1
}
