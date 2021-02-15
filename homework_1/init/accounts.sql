CREATE SCHEMA IF NOT EXISTS accounts;

CREATE TABLE IF NOT EXISTS accounts.accounts (
    id          serial PRIMARY KEY,
    client_name varchar(40) NOT NULL,
    amount      integer CHECK (amount >= 0)
);

INSERT INTO accounts.accounts(client_name, amount) VALUES ('John', 1000);
