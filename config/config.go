package config

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

type Config struct {
	DBUrl				string
	DiscordWebhookURL 	string
}

func Load() *Config {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	return &Config{
		DBUrl:				os.Getenv("SUPABASE_DB_URL"),
		DiscordWebhookURL: 	os.Getenv("DISCORD_WEBHOOK_URL"),
	}
}