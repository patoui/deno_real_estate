CREATE TABLE IF NOT EXISTS favourites (
    user_id INT NOT NULL,
    listing_id INT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);
