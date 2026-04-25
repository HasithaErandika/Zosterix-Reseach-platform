package auth

import (
	"bytes"
	"encoding/json"
	"fmt"
	"net/http"
)

type EmailService struct {
	apiKey    string
	emailFrom string
	appURL    string
}

func NewEmailService(apiKey, emailFrom, appURL string) *EmailService {
	return &EmailService{
		apiKey:    apiKey,
		emailFrom: emailFrom,
		appURL:    appURL,
	}
}

type resendRequest struct {
	From    string `json:"from"`
	To      []string `json:"to"`
	Subject string `json:"subject"`
	HTML    string `json:"html"`
}

func (s *EmailService) send(to string, subject, html string) error {
	url := "https://api.resend.com/emails"
	reqBody, _ := json.Marshal(resendRequest{
		From:    s.emailFrom,
		To:      []string{to},
		Subject: subject,
		HTML:    html,
	})

	req, err := http.NewRequest("POST", url, bytes.NewBuffer(reqBody))
	if err != nil {
		return err
	}

	req.Header.Set("Authorization", "Bearer "+s.apiKey)
	req.Header.Set("Content-Type", "application/json")

	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		return err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK && resp.StatusCode != http.StatusCreated {
		return fmt.Errorf("resend api error: status %d", resp.StatusCode)
	}

	return nil
}

func (s *EmailService) SendVerificationEmail(to, name, token string) error {
	subject := "Verify your Zosterix email address"
	link := fmt.Sprintf("%s/verify-email?token=%s", s.appURL, token)
	html := fmt.Sprintf(`
		<h1>Hi %s,</h1>
		<p>Click the link below to verify your email. This link expires in 24 hours.</p>
		<a href="%s" style="padding: 12px 24px; background: black; color: white; border-radius: 8px; text-decoration: none; font-weight: bold;">Verify Email</a>
		<p>Or copy this link: %s</p>
	`, name, link, link)
	return s.send(to, subject, html)
}

func (s *EmailService) SendPasswordResetEmail(to, token string) error {
	subject := "Reset your Zosterix password"
	link := fmt.Sprintf("%s/reset-password?token=%s", s.appURL, token)
	html := fmt.Sprintf(`
		<h1>Reset your password</h1>
		<p>Someone requested a password reset for your account. Click below to set a new password. This link expires in 1 hour. If you didn't request this, you can ignore this email.</p>
		<a href="%s" style="padding: 12px 24px; background: black; color: white; border-radius: 8px; text-decoration: none; font-weight: bold;">Reset Password</a>
		<p>Or copy this link: %s</p>
	`, link, link)
	return s.send(to, subject, html)
}

func (s *EmailService) SendEmailChangeVerification(to, token string) error {
	subject := "Confirm your new Zosterix email address"
	link := fmt.Sprintf("%s/confirm-email-change?token=%s", s.appURL, token)
	html := fmt.Sprintf(`
		<h1>Confirm your new email</h1>
		<p>A request was made to change your Zosterix email address to this one. Click below to confirm.</p>
		<a href="%s" style="padding: 12px 24px; background: black; color: white; border-radius: 8px; text-decoration: none; font-weight: bold;">Confirm Email Change</a>
	`, link)
	return s.send(to, subject, html)
}

func (s *EmailService) SendEmailChangeAlert(to, newEmail string) error {
	subject := "Your Zosterix email address is being changed"
	html := fmt.Sprintf(`
		<h1>Email change requested</h1>
		<p>A request was made to change your Zosterix email address to %s. If this wasn't you, please contact support immediately at support@zosterix.com.</p>
	`, newEmail)
	return s.send(to, subject, html)
}
