package db

import (
	"database/sql"
	"fmt"
	"time"
)

type Reminder struct {
	ID 			string
	Title 		string
	UserID 		string
	DiscordID 	string
	Phone 		string
}

func GetDueReminders(db *sql.DB) ([]Reminder, error) {
	/* 
	Find all the active reminders that are due for today
     Check two things:
         - today's day of the week is in the reminder's days_of_week array
         - current time is within 5 minutes of one of the fire_times
	*/

	now := time.Now()

	// 0 = Sunday ... 6= Saturday
	todayDOW := int(now.Weekday())

	rows, err := db.Query(`
		SELECT r.id, r.title, r.user_id, u.discord_id, u.phone
		FROM reminders r
		JOIN users u ON u.id = r.user_id
		WHERE r.active = true
			AND $1 = ANY(r.days_of_week)
			AND EXISTS (
				SELECT 1 FROM unnest(r.fire_times) AS ft
				WHERE ft BETWEEN NOW()::time - interval '15 minutes'
							 AND NOW()::time + interval '15 minutes'
			)
	`, todayDOW)
	if err != nil {
		return nil, err
	}

	// Close db conn
	defer rows.Close()

	var reminders []Reminder
	for rows.Next() {
		var r Reminder
		err := rows.Scan(&r.ID, &r.Title, &r.UserID, &r.DiscordID, &r.Phone)
		if err != nil {
			return nil, err
		}
		reminders = append(reminders, r)
	}
	return reminders, nil
}

func IsCompletedToday(db *sql.DB, reminderID, userID string) (bool, error) {
	/* 
		Check if a reminder has already been completed today
		Returns True if completed, False if not
	*/
	var exists bool
	err := db.QueryRow(`
		SELECT EXISTS (
			SELECT 1 FROM completions
			WHERE reminder_id = $1
				AND user_id = $2
				AND completed_on = CURRENT_DATE
		)
	`, reminderID, userID).Scan(&exists)
	if err != nil {
		return false, err
	}
	return exists, nil
}

func MarkCompleted(db *sql.DB, reminderID, userID string) error {
	/*
	    Mark a reminder as done for today by inserting a completion row
    	The UNIQUE constraint in the schema prevents duplicate completions 
	*/
	_, err := db.Exec(`
		INSERT INTO completions (reminder_id, user_id, completed_on)
		VALUES ($1, $2, CURRENT_DATE)
		ON CONFLICT DO NOTHING
	`, reminderID, userID)
	return err	
}

func GetUserByIdentifier(db *sql.DB, discordID, phone string) (*sql.Row, error) {
	/* 
	    Look up a user by their provided credentials (Discord ID or phone number)
    	Used when someone marks a reminder as done externally through Discord or SMS
	*/
	if discordID == "" && phone == "" {
		return nil, fmt.Errorf("must provide either a Discord ID or phone number")
	}

	if discordID != "" {
		return db.QueryRow(`SELECT * FROM users WHERE discord_id = $1`, discordID), nil
	}
	return db.QueryRow(`SELECT * FROM users WHERE phone = $1`, phone), nil
}