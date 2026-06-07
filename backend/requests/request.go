package requests

type VerificationRequest struct {
	ID          int    `json:"id"`
	StudentID   int    `json:"student_id"`
	DomainID    int    `json:"domain_id"`
	Title       string `json:"title"`
	Description string `json:"description"`
	EventDate   string `json:"event_date"`
	ProofLink   string `json:"proof_link"`
	Status      string `json:"status"`
	Remarks     string `json:"remarks"`
}