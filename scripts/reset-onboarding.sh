#!/usr/bin/env bash
# Dev only: put a local account back at the start of onboarding (default: onb_preview).
set -euo pipefail
USERNAME="${1:-onb_preview}"
CONTAINER="${PG_CONTAINER:-blklight-fastify-api-postgres-1}"
docker exec -i "$CONTAINER" psql -U postgres -d blklight_api -v ON_ERROR_STOP=1 -v u="$USERNAME" <<'SQL'
DELETE FROM user_apps WHERE profile_id IN (
  SELECT p.id FROM profiles p JOIN users u ON u.id = p.user_id WHERE u.username = :'u'
);
UPDATE users SET onboarding_complete = false WHERE username = :'u';
SQL
echo "onboarding reset for @$USERNAME"
