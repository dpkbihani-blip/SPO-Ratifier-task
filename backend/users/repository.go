package users

import "database/sql"
import "SPO-ratifier/requests"

type Repository struct {
	DB *sql.DB
}

func (r *Repository) GetStudent(
	id int,
) (StudentProfile, error) {

	var student StudentProfile

	err := r.DB.QueryRow(`
		SELECT
			id,
			name,
			email
		FROM users
		WHERE id = $1
	`, id).Scan(
		&student.ID,
		&student.Name,
		&student.Email,
	)

	return student, err
}
func (r *Repository) GetApprovedRequests(
	studentID int,
) ([]requests.VerificationRequest, error) {

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
			remarks
		FROM verification_requests
		WHERE
			student_id = $1
			AND status = 'approved'
	`, studentID)

	if err != nil {
		return nil, err
	}

	defer rows.Close()

	var records []requests.VerificationRequest

	for rows.Next() {

		var req requests.VerificationRequest

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

		records = append(records, req)
	}

	return records, nil
}