CREATE SCHEMA IF NOT EXISTS flights;

CREATE TABLE IF NOT EXISTS flights.bookings (
    id          serial PRIMARY KEY,
    client_name varchar(40) NOT NULL,
    fly_number  varchar(10) NOT NULL,
    "from"      char(3) NOT NULL,
    "to"        char(3) NOT NULL,
    "date"      date
);
