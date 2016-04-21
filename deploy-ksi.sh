#!/bin/bash

# This script requires `ksi` to be defined in .ssh/config

LOCAL_DIR="dist"
HOST="ksi"
REMOTE_DIR="/var/www/ksi"

read -p "Really update frontend at $HOST$REMOTE_DIR ? (y/n) " -n 1 -r
echo    # (optional) move to a new line
if [[ ! $REPLY =~ ^[Yy]$ ]]
then
    exit 1
    fi

rsync -avz --delete -r $LOCAL_DIR/ $HOST:$REMOTE_DIR

