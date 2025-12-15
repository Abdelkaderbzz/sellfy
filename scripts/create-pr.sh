#!/bin/bash
set -e

# GitHub repository info
REPO_OWNER=$(echo "$GITHUB_REPOSITORY" | cut -d'/' -f1)
REPO_NAME=$(echo "$GITHUB_REPOSITORY" | cut -d'/' -f2)
TARGET_BRANCH="main"

# Team members usernames (replace with actual GitHub usernames)
USERS=("Abdelkaderbzzz")

# Pick random reviewer
RANDOM_INDEX=$((RANDOM % ${#USERS[@]}))
ASSIGNEE=${USERS[$RANDOM_INDEX]}

# PR details
TITLE="PR: $SOURCE_BRANCH → $TARGET_BRANCH"
DESCRIPTION="🚀 Auto-created Pull Request

- Branch: $SOURCE_BRANCH
- Commit: ${COMMIT_SHA:0:8}
- Author: $ACTOR
"

# Check if PR already exists
EXISTING_PR=$(curl -s \
  -H "Authorization: token $GITHUB_TOKEN" \
  -H "Accept: application/vnd.github.v3+json" \
  "https://api.github.com/repos/$GITHUB_REPOSITORY/pulls?head=$REPO_OWNER:$SOURCE_BRANCH&base=$TARGET_BRANCH" \
  | jq -r '.[0].number // empty')

if [ -n "$EXISTING_PR" ]; then
  echo "Pull request already exists: #$EXISTING_PR"
  exit 0
fi

# Create the pull request
PR_RESPONSE=$(curl -s \
  -X POST \
  -H "Authorization: token $GITHUB_TOKEN" \
  -H "Accept: application/vnd.github.v3+json" \
  "https://api.github.com/repos/$GITHUB_REPOSITORY/pulls" \
  -d "{
    \"title\": \"$TITLE\",
    \"body\": \"$DESCRIPTION\",
    \"head\": \"$SOURCE_BRANCH\",
    \"base\": \"$TARGET_BRANCH\"
  }")

# Extract PR number
PR_NUMBER=$(echo "$PR_RESPONSE" | jq -r '.number // empty')

if [ -z "$PR_NUMBER" ]; then
  echo "Failed to create pull request"
  echo "Response: $PR_RESPONSE"
  exit 1
fi

echo "Created pull request #$PR_NUMBER"

# Assign reviewer (optional - requires additional permissions)
curl -s \
  -X POST \
  -H "Authorization: token $GITHUB_TOKEN" \
  -H "Accept: application/vnd.github.v3+json" \
  "https://api.github.com/repos/$GITHUB_REPOSITORY/pulls/$PR_NUMBER/requested_reviewers" \
  -d "{\"reviewers\": [\"$ASSIGNEE\"]}" > /dev/null || echo "Note: Could not assign reviewer (may need additional permissions)"

echo "Pull request created successfully: https://github.com/$GITHUB_REPOSITORY/pull/$PR_NUMBER"
