#!/bin/bash

DOCKER=${DOCKER:-"docker"}
IMAGE=${IMAGE:-"tda24"}
PORT=${PORT:-"8080"}

PROJECT_DIR=$(dirname "$0")

$DOCKER build $PROJECT_DIR -t $IMAGE
$DOCKER run --rm -it -p $PORT:80 $IMAGE:latest
