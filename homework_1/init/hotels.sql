CREATE SCHEMA IF NOT EXISTS hotels;

CREATE TABLE IF NOT EXISTS hotels.bookings (
    id          serial PRIMARY KEY,
    client_name varchar(40) NOT NULL,
    hotel_name  varchar(40) NOT NULL,
    arrival     date NOT NULL,
    departure   date NOT NULL
);
