package admin

type RequestUpdate struct {
	RequestID int    `json:"request_id"`
	Status    string `json:"status"`
	Remarks   string `json:"remarks"`
}

type DomainAdmin struct {
	UserID   int `json:"user_id"`
	DomainID int `json:"domain_id"`
}

type DomainRequest struct {
ID          int    `json:"id"`
StudentID   int    `json:"student_id"`
StudentName string `json:"student_name"`
DomainID    int    `json:"domain_id"`
Title       string `json:"title"`
Description string `json:"description"`
EventDate   string `json:"event_date"`
ProofLink   string `json:"proof_link"`
Status      string `json:"status"`
Remarks     string `json:"remarks"`
}
