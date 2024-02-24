#!/bin/bash

_CURRENT_DIR=$(dirname "$0")
source $_CURRENT_DIR/_vars.sh

SOURCE_FILE=$PROJECT_DIR/.env.container
OUTPUT_FILE=$PROJECT_DIR/.env.local

function _escape() {
  echo $(printf '%s\n' "$1" | sed -e 's/[\/&]/\\&/g')
}

function _replace() {
  VARIABLE="$1"
  VALUE="$(_escape $2)"

  sed -i "s/$VARIABLE/$VALUE/g" $OUTPUT_FILE
}

cp $SOURCE_FILE $OUTPUT_FILE

_replace @JWT_ACCESS_KEY@ $JWT_ACCESS_KEY
_replace @DB_URL@ $DB_URL
