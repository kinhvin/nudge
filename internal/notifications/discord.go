package notifications

import (
	"bytes"
	"encoding/json"
	"fmt"
	"net/http"
)

// Constants
const SUCCESS_CODE = 204

type discordPayload struct {
	Content string `json:"content"`
}

func SendDiscordNotification(webhookURL, reminderTitle string) error {
	payload := discordPayload{
		Content: fmt.Sprintf("Hey, you haven't done **%s** yet. Get on it!", reminderTitle),
	}

	body, err := json.Marshal(payload)
	if err != nil {
		return fmt.Errorf("failed to marshal discord payload: %w", err)
	}

	resp, err := http.Post(webhookURL, "application/json", bytes.NewBuffer(body))
	if err != nil {
		return fmt.Errorf("failed to send discord notifacation: %w", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != SUCCESS_CODE {
		return fmt.Errorf("discord webhook returned unexpected status: %d", resp.StatusCode)
	}

	return nil
}