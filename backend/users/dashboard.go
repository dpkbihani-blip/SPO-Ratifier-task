package users

import "SPO-ratifier/requests"

type DashboardResponse struct {
	Student StudentProfile                 `json:"student"`
	Requests []requests.VerificationRequest `json:"requests"`
}