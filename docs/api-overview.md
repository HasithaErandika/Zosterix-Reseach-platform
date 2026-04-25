# API Overview

Base prefix: `/api/v1`

## Domains

- `auth`: registration, login, refresh, logout, password recovery, verification
- `users`: profile, settings, notifications, follow/feed
- `posts`: blog content, reactions, comments
- `threads`: forum threads, replies, upvotes, moderation hooks
- `supervisors`: verification, directory, mentorship requests
- `admin`: user management, moderation, reports

## Response Envelope

All endpoints should return:

```json
{
  "success": true,
  "data": {},
  "error": null,
  "meta": null
}
```

## Auth Notes

- Access token is sent as Bearer token.
- Refresh token is sent via httpOnly cookie.
- Frontend should attempt silent refresh after 401.

## Pagination

List endpoints should include `meta` with:
- `page`
- `per_page`
- `total`
