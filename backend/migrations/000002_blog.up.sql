CREATE TABLE blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id UUID REFERENCES users(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  body JSONB NOT NULL,
  body_search TSVECTOR GENERATED ALWAYS AS (
    to_tsvector('english', coalesce(title, '') || ' ' || coalesce(body->>'text', ''))
  ) STORED,
  tags TEXT[] NOT NULL DEFAULT '{}',
  status TEXT NOT NULL CHECK (status IN ('draft', 'published')) DEFAULT 'draft',
  image_count INTEGER NOT NULL DEFAULT 0,
  reaction_like INTEGER NOT NULL DEFAULT 0,
  reaction_insightful INTEGER NOT NULL DEFAULT 0,
  reaction_helpful INTEGER NOT NULL DEFAULT 0,
  comment_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE TABLE blog_comments (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), post_id UUID NOT NULL REFERENCES blog_posts(id) ON DELETE CASCADE, author_id UUID REFERENCES users(id) ON DELETE SET NULL, parent_comment_id UUID REFERENCES blog_comments(id) ON DELETE CASCADE, body TEXT NOT NULL, is_hidden BOOLEAN NOT NULL DEFAULT FALSE, created_at TIMESTAMPTZ NOT NULL DEFAULT NOW());
CREATE TABLE blog_reactions (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), post_id UUID NOT NULL REFERENCES blog_posts(id) ON DELETE CASCADE, user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE, reaction_type TEXT NOT NULL CHECK (reaction_type IN ('like', 'insightful', 'helpful')), UNIQUE(post_id, user_id));
