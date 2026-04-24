CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT,
  role TEXT NOT NULL CHECK (role IN ('researcher', 'student', 'supervisor', 'administrator')),
  supervisor_status TEXT CHECK (supervisor_status IN ('none', 'pending', 'verified', 'rejected')),
  email_verified BOOLEAN NOT NULL DEFAULT FALSE,
  google_oauth_id TEXT UNIQUE,
  is_suspended BOOLEAN NOT NULL DEFAULT FALSE,
  is_banned BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  deletion_requested_at TIMESTAMPTZ
);

CREATE TABLE profiles (
  user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  display_name TEXT,
  bio TEXT,
  institution TEXT,
  research_interests JSONB DEFAULT '[]',
  profile_photo_url TEXT,
  social_links JSONB DEFAULT '{}',
  email_notif_prefs JSONB DEFAULT '{}',
  coauthor_matching_consent BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_profiles_research_interests ON profiles USING GIN(research_interests);

CREATE TABLE refresh_token_blocklist (
  token_hash TEXT PRIMARY KEY,
  expires_at TIMESTAMPTZ NOT NULL
);

CREATE TABLE email_verifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  token TEXT NOT NULL UNIQUE,
  token_type TEXT NOT NULL CHECK (token_type IN ('email_verify', 'email_change', 'password_reset')),
  new_email TEXT,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
