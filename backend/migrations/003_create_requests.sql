CREATE TABLE verification_requests (
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