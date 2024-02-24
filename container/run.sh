#!/bin/bash

_CONTAINER="docker.io/library/mongo:latest"

_CURRENT_DIR=$(dirname "$0")
source $_CURRENT_DIR/_vars.sh

(cd $CONTAINER_DIR; $PODMAN compose -f docker-compose.yml up --no-attach mongodb)
