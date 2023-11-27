#!/bin/bash

_CURRENT_DIR=$(dirname "$0")
source $_CURRENT_DIR/_vars.sh

SECRET=${SECRET:-""}
CREDENTIALS_URL="https://auth.registry.tourdeapp.eu/staging-auth"
REGISTRY_URL="registry.tourdeapp.eu"
REGISTRY_USERNAME="tourdeapp"

_RESPONSE=$(curl -s -X POST -H "Content-Type: application/json" -d "{\"team_secret\": \"$SECRET\"}" $CREDENTIALS_URL)

REGISTRY_PASSWORD=$(echo $_RESPONSE | jq -r .key)
REMOTE_IMAGE=$(echo $_RESPONSE | jq -r .name)

$PODMAN login --username $REGISTRY_USERNAME --password $REGISTRY_PASSWORD $REGISTRY_URL
$PODMAN tag $IMAGE $REMOTE_IMAGE
$PODMAN push $REMOTE_IMAGE
