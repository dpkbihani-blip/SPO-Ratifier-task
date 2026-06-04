package database

import "database/sql"

func InitSchema(db *sql.DB) error {

	_, err := db.Exec(`
	CREATE TABLE IF NOT EXISTS users (
		id SERIAL PRIMARY KEY,
		name TEXT NOT NULL,
		email TEXT UNIQUE NOT NULL,
		password_hash TEXT NOT NULL,
		role TEXT NOT NULL,
		created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
	);
	`)
	if err != nil {
		return err
	}

	_, err = db.Exec(`
	CREATE TABLE IF NOT EXISTS domains (
		id SERIAL PRIMARY KEY,
		name TEXT UNIQUE NOT NULL
	);
	`)
	if err != nil {
		return err
	}

	_, err = db.Exec(`
	CREATE TABLE IF NOT EXISTS verification_requests (
		id SERIAL PRIMARY KEY,

		student_id INTEGER NOT NULL,
		domain_id INTEGER NOT NULL,

		title TEXT NOT NULL,
		description TEXT,

		event_date DATE,

		proof_link TEXT,

		status TEXT DEFAULT 'pending',

		remarks TEXT,

		created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

		FOREIGN KEY (student_id)
			REFERENCES users(id),

		FOREIGN KEY (domain_id)
			REFERENCES domains(id)
	);
	`)
	if err != nil {
		return err
	}

	_, err = db.Exec(`
	CREATE TABLE IF NOT EXISTS domain_admins (
		user_id INTEGER PRIMARY KEY,

		domain_id INTEGER NOT NULL,

		FOREIGN KEY (user_id)
			REFERENCES users(id),

		FOREIGN KEY (domain_id)
			REFERENCES domains(id)
	);
	`)
	if err != nil {
		return err
	}

	return nil
}