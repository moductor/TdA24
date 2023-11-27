#!/bin/bash

_CURRENT_DIR=$(dirname "$0")
source $_CURRENT_DIR/_vars.sh

$PODMAN build $PROJECT_DIR -f $CONTAINER_DIR/Containerfile -t $IMAGE
