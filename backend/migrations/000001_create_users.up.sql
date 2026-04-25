-- 000001_create_users.up.sql
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE users (
    id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email                 TEXT UNIQUE NOT NULL,
    password_hash         TEXT,                          -- NULL for Google OAuth-only accounts
    full_name             TEXT NOT NULL,
    role                  TEXT NOT NULL CHECK (role IN ('researcher', 'student', 'supervisor', 'administrator')),
    supervisor_status     TEXT DEFAULT 'none' CHECK (supervisor_status IN ('none', 'pending_verification', 'verified', 'rejected')),
    email_verified        BOOLEAN NOT NULL DEFAULT FALSE,
    google_oauth_id       TEXT UNIQUE,                   -- NULL for password accounts
    is_suspended          BOOLEAN NOT NULL DEFAULT FALSE,
    is_banned             BOOLEAN NOT NULL DEFAULT FALSE,
    deletion_requested_at TIMESTAMPTZ,
    created_at            TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at            TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Tokens table for email verification and password reset
CREATE TABLE auth_tokens (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id     UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    token_hash  TEXT NOT NULL UNIQUE,                    -- bcrypt hash of the raw token
    token_type  TEXT NOT NULL CHECK (token_type IN ('email_verification', 'password_reset', 'email_change')),
    new_email   TEXT,                                    -- only for email_change type
    expires_at  TIMESTAMPTZ NOT NULL,
    used_at     TIMESTAMPTZ,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_users_email       ON users(email);
CREATE INDEX idx_users_role        ON users(role);
CREATE INDEX idx_auth_tokens_hash  ON auth_tokens(token_hash);
CREATE INDEX idx_auth_tokens_user  ON auth_tokens(user_id, token_type);

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();
