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
		log.Println("No .env file found, reading from environment variables")
	}

	return &Config{
		DBUrl:				os.Getenv("SUPABASE_DB_URL"),
		DiscordWebhookURL: 	os.Getenv("DISCORD_WEBHOOK_URL"),
	}
}