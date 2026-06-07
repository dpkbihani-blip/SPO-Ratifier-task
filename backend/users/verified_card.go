package users

import "SPO-ratifier/requests"

type VerifiedCardResponse struct {
Student StudentProfile                 `json:"student"`
Records []requests.VerificationRequest `json:"records"`
}
