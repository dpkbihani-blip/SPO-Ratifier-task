package auth

import (
	"database/sql"
)

type Repository struct {
	DB *sql.DB
}

func (r *Repository) CreateUser(user User) error {

	_, err := r.DB.Exec(`
	INSERT INTO users (
		name,
		email,
		password_hash,
		role
	)
	VALUES ($1, $2, $3, $4)
	`,
		user.Name,
		user.Email,
		user.PasswordHash,
		user.Role,
	)

	return err
}

func (r *Repository) GetUserByEmail(email string) (User, error) {

	var user User

	err := r.DB.QueryRow(`
		SELECT
			id,
			name,
			email,
			password_hash,
			role
		FROM users
		WHERE email = $1
	`, email).Scan(
		&user.ID,
		&user.Name,
		&user.Email,
		&user.PasswordHash,
		&user.Role,
	)

	return user, err
}