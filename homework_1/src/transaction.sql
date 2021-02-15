BEGIN;

INSERT INTO flights.bookings(client_name, fly_number, "from", "to", "date")
VALUES ('John', 'PQ881', 'KBP', 'SOF', DATE '2021-02-20');
UPDATE accounts.accounts SET amount = amount - 175 WHERE client_name = 'John';

INSERT INTO flights.bookings(client_name, fly_number, "from", "to", "date")
VALUES ('John', 'PQ882', 'SOF', 'KBP', DATE '2021-02-27');
UPDATE accounts.accounts SET amount = amount - 175 WHERE client_name = 'John';

INSERT INTO hotels.bookings(client_name, hotel_name, arrival, departure)
VALUES ('John', 'Regnum', DATE '2021-02-20', DATE '2021-02-27');
UPDATE accounts.accounts SET amount = amount - 300 WHERE client_name = 'John';

PREPARE TRANSACTION 'book_transaction';
