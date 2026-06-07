package admin

import (
	"database/sql"
)

type Repository struct {
	DB *sql.DB
}
func (r *Repository) AssignDomainAdmin(
	userID int,
	domainID int,
) error {

	_, err := r.DB.Exec(`
	INSERT INTO domain_admins
	(user_id, domain_id)
	VALUES ($1,$2)
	`,
		userID,
		domainID,
	)

	return err
}
func (r *Repository) GetAdminDomain(
	userID int,
) (int, error) {

	var domainID int

	err := r.DB.QueryRow(`
	SELECT domain_id
	FROM domain_admins
	WHERE user_id = $1
	`,
		userID,
	).Scan(&domainID)

	return domainID, err
}
func (r *Repository) GetRequestsByDomain(
	domainID int,
) ([]DomainRequest, error) {

	rows, err := r.DB.Query(`
	SELECT
		vr.id,
		vr.student_id,
		vr.domain_id,
		vr.title,
		vr.description,
		vr.event_date,
		vr.proof_link,
		vr.status,
		vr.remarks,
		u.name
	FROM verification_requests vr
	JOIN users u
		ON vr.student_id = u.id
	WHERE vr.domain_id = $1
	`,
		domainID,
	)

	if err != nil {
		return nil, err
	}

	defer rows.Close()

	var requests []DomainRequest

	for rows.Next() {

		var req DomainRequest

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
			&req.StudentName,
		)

		if err != nil {
			return nil, err
		}

		requests = append(
			requests,
			req,
		)
	}

	return requests, nil
}
func (r *Repository) UpdateRequestStatus(
	requestID int,
	status string,
	remarks string,
) error {

	_, err := r.DB.Exec(`
	UPDATE verification_requests
	SET
		status = $1,
		remarks = $2
	WHERE id = $3
	`,
		status,
		remarks,
		requestID,
	)

	return err
}