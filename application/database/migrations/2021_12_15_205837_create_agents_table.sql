CREATE TABLE IF NOT EXISTS agents (
    id SERIAL PRIMARY KEY NOT NULL,
    user_id INT NOT NULL,
    agency VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);