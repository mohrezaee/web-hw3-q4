CREATE TABLE IF NOT EXISTS user_accounts
(
    user_id       SERIAL PRIMARY KEY,
    email         VARCHAR UNIQUE NOT NULL,
    phone_number  VARCHAR UNIQUE NOT NULL,
    gender        VARCHAR(1),
    first_name    VARCHAR,
    last_name     VARCHAR,
    password_hash VARCHAR
);

CREATE UNIQUE INDEX ON user_accounts (email);

CREATE UNIQUE INDEX ON user_accounts (phone_number);

CREATE TABLE IF NOT EXISTS unauthorized_tokens
(
    user_id    INTEGER REFERENCES user_accounts ON DELETE CASCADE ON UPDATE CASCADE,
    token      VARCHAR,
    expiration TIMESTAMP
);

CREATE INDEX ON unauthorized_tokens (token);
