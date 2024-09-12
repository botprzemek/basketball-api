DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE IF NOT EXISTS users (
    id              UUID NOT NULL UNIQUE DEFAULT gen_random_uuid() PRIMARY KEY,
    email           STRING NOT NULL UNIQUE,
    recovery_email  STRING DEFAULT NULL,
    password        STRING NOT NULL,
    refresh_token   STRING DEFAULT NULL,
    verify_token    STRING DEFAULT NULL,
    logged_at       TIMESTAMP DEFAULT NULL,
    created_at      TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP DEFAULT NULL
);