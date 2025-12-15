#!/bin/sh
set -e

PROJECT_ID="$CI_PROJECT_ID"
SOURCE_BRANCH="$CI_COMMIT_BRANCH"
TARGET_BRANCH="main"

# team members IDs (example)
USERS=(12 25 31 44)

# pick random reviewer
RANDOM_INDEX=$((RANDOM % ${#USERS[@]}))
ASSIGNEE_ID=${USERS[$RANDOM_INDEX]}

TITLE="MR: $SOURCE_BRANCH → $TARGET_BRANCH"
DESCRIPTION="🚀 Auto-created MR

- Branch: $SOURCE_BRANCH
- Commit: $CI_COMMIT_SHORT_SHA
- Author: $GITLAB_USER_NAME
"

curl --request POST \
  --header "PRIVATE-TOKEN: $GITLAB_TOKEN" \
  --data "source_branch=$SOURCE_BRANCH" \
  --data "target_branch=$TARGET_BRANCH" \
  --data "title=$TITLE" \
  --data "description=$DESCRIPTION" \
  --data "assignee_id=$ASSIGNEE_ID" \
  --data "remove_source_branch=true" \
  "https://gitlab.com/api/v4/projects/$PROJECT_ID/merge_requests"