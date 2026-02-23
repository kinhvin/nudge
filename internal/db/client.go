package db

import (
	"database/sql"
	"log"

	"github.com/kinhvin/nudge/config"
	_ "github.com/lib/pq"
)

func GetConnection(cfg *config.Config) *sql.DB {
	db, err := sql.Open("postgres", cfg.DBUrl)
	if err != nil {
		log.Fatal("Error opening database connection: ", err)
	}

	err = db.Ping()
	if err != nil {
		log.Fatal("Error connecting to database: ", err)
	}

	return db
}