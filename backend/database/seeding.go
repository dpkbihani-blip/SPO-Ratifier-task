package database

import "database/sql"

func SeedDomains(db *sql.DB) error {

	_, err := db.Exec(`
	INSERT INTO domains (name)
	VALUES
		('GnS'),
		('AnC'),
		('SnT'),
		('MnC')
	ON CONFLICT (name) DO NOTHING;
	`)

	return err
}