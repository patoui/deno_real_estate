CREATE TABLE IF NOT EXISTS listings (
    id SERIAL PRIMARY KEY NOT NULL,
    mls_number INT,
    user_id INT NOT NULL,
    price INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    address VARCHAR(255) NOT NULL,
    address_2 VARCHAR(50) NOT NULL,
    postal_code VARCHAR(6) NOT NULL,
    city VARCHAR(100) NOT NULL,
    province VARCHAR(30) NOT NULL,
    country VARCHAR(30) NOT NULL,
    bedrooms SMALLINT NOT NULL,
    bathrooms SMALLINT NOT NULL,
    property_type VARCHAR(50) NOT NULL,
    house_type VARCHAR(50) NOT NULL,
    stories SMALLINT NOT NULL,
    title VARCHAR(50) NOT NULL,
    build_year SMALLINT NOT NULL,
    parking_type VARCHAR(50) NOT NULL,
    published_at TIMESTAMP,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);
-- TODO: add listing_features which includes: appliances, heat/ac source, utilities, etc
-- TODO: add listing_rooms which includes: which floor the room is on, room name, dimensions, etc