package requests

import "database/sql"

type Repository struct {
	DB *sql.DB
}

func (r *Repository) CreateRequest(req VerificationRequest) error {

	_, err := r.DB.Exec(`
	INSERT INTO verification_requests
	(
		student_id,
		domain_id,
		title,
		description,
		event_date,
		proof_link
	)
	VALUES ($1,$2,$3,$4,$5,$6)
	`,
		req.StudentID,
		req.DomainID,
		req.Title,
		req.Description,
		req.EventDate,
		req.ProofLink,
	)

	return err
}

func (r *Repository) GetRequestsByStudent(
	studentID int,
) ([]VerificationRequest, error) {

	rows, err := r.DB.Query(`
		SELECT
			id,
			student_id,
			domain_id,
			title,
			description,
			event_date,
			proof_link,
			status,
			COALESCE(remarks, '')
		FROM verification_requests
		WHERE student_id = $1
	`, studentID)

	if err != nil {
		return nil, err
	}

	defer rows.Close()

	var requests []VerificationRequest

	for rows.Next() {

		var req VerificationRequest

		err := rows.Scan(
			&req.ID,
			&req.StudentID,
			&req.DomainID,
			&req.Title,
			&req.Description,
			&req.EventDate,
			&req.ProofLink,
			&req.Status,
			&req.Remarks,
		)

		if err != nil {
			return nil, err
		}

		requests = append(requests, req)
	}

	return requests, nil
}