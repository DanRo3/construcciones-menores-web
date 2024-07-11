package feedback

import (
	"context"

	"github.com/ProImpact/construccionesMenores/internal/database/model"
	"github.com/jackc/pgx/v5"
)

func CreateFeedBack(feed model.FeedBack, conect *pgx.Conn) error {
	query := "insert into feedback(username,email,message) values($1 ,$2 ,$3)"
	if _, err := conect.Exec(context.Background(), query, feed.UserName, feed.Email, feed.Message); err != nil {
		return err
	}
	return nil
}

func DeleteFeedBack(feedId int, conect *pgx.Conn) error {
	query := "delete from feedback where id = $1"
	if _, err := conect.Exec(context.Background(), query, feedId); err != nil {
		return err
	}
	return nil
}

func GetFeedback(feedId int, conect *pgx.Conn) (model.FeedBack, error) {
	query := "select username,email,message from feedback where id = $1"
	var feed model.FeedBack
	if err := conect.QueryRow(context.Background(), query, feedId).Scan(
		&feed.UserName, &feed.Email, &feed.Message); err != nil {
		return feed, err
	}
	return feed, nil
}

func GetAllFeedBacks(conect *pgx.Conn) ([]model.FeedBack, error) {
	var users []model.FeedBack
	query := "select id,username,email,message from feedback"
	row, err := conect.Query(context.Background(), query)
	if err != nil {
		return users, err
	}
	defer row.Close()
	for row.Next() {
		var u model.FeedBack
		if err := row.Scan(&u.Id, &u.UserName, &u.Email, &u.Message); err != nil {
			return users, err
		}
		users = append(users, u)
	}
	return users, nil
}
