#!/bin/bash

_CURRENT_DIR=$(dirname "$0")
source $_CURRENT_DIR/_vars.sh

DB_CONTAINER_ID_FILE="$PROJECT_DIR/_container_id_db.tmp"

if [[ -f "$DB_CONTAINER_ID_FILE" ]]; then
  DB_CONTAINER_ID=$(cat "$DB_CONTAINER_ID_FILE")
fi

if [[ -z "$DB_CONTAINER_ID" ]]; then
  DB_CONTAINER_ID=$($PODMAN container create -p $MONGODB_PORT:27017 mongo:latest)
  echo "$DB_CONTAINER_ID" > $DB_CONTAINER_ID_FILE
fi

$PODMAN container start $DB_CONTAINER_ID
npm install
npm run dev
