#!/bin/bash
set -e

source "$(dirname "$0")/.env"

if [ ! -d ".git" ]; then
    echo "Initializing new git repository..."
    git init
    git remote add origin "$REPOSITORY_URL"
    git fetch origin
    DEFAULT_BRANCH=$(git remote show origin | sed -n '/HEAD branch/s/.*: //p')
    echo "Checking out $DEFAULT_BRANCH..."
    git checkout -f -t "origin/$DEFAULT_BRANCH"
else
    echo "Git repository already exists."
fi

echo "Done."
