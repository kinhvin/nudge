package main

import (
	"fmt"
	"log"

	"github.com/kinhvin/nudge/config"
	"github.com/kinhvin/nudge/internal/db"
	"github.com/kinhvin/nudge/internal/notifications"
)

func main() {
	cfg := config.Load()

	conn := db.GetConnection(cfg)
	defer conn.Close()

	reminders, err := db.GetDueReminders(conn)
	if err != nil {
		log.Fatal("Error fetching due reminders: ", err)
	}

	if len(reminders) == 0 {
		fmt.Println("No reminders right now.")
		return
	}

	for _, reminder := range reminders {
		completed, err := db.IsCompletedToday(conn, reminder.ID, reminder.UserID)
		if err != nil {
			log.Printf("Error checking completion for %s: %v", reminder.Title, err)
			continue
		}

		if completed {
			fmt.Printf("Skipping %s - already done today.\n", reminder.Title)
			continue
		}

		if reminder.DiscordID != "" {
			err = notifications.SendDiscordNotification(cfg.DiscordWebhookURL, reminder.Title)
			if err != nil {
				log.Printf("Failed to send Discord notification for %s: %v", reminder.Title, err)
			} else {
				fmt.Printf("Discord notification sent for: %s\n", reminder.Title)
			}
		}
	}
}