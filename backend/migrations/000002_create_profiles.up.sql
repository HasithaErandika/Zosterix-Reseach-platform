-- 000002_create_profiles.up.sql
CREATE TABLE researcher_profiles (
    user_id              UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    display_name         TEXT,
    bio                  TEXT,
    institution          TEXT,
    research_interests   TEXT[] DEFAULT '{}',
    profile_photo_url    TEXT,
    social_links         JSONB DEFAULT '{}',              -- { orcid, scholar, linkedin }
    email_notif_prefs    JSONB DEFAULT '{}',
    coauthor_consent     BOOLEAN NOT NULL DEFAULT FALSE,   -- GDPR opt-in for V2 co-author matching
    created_at           TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at           TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER profiles_updated_at BEFORE UPDATE ON researcher_profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();
