#!/bin/bash

LOCAL_DIR="dist"
REMOTE_USER="ksi"
HOST="ksi.fi.muni.cz"
REMOTE_DIR="/var/www/ksi"

read -p "Really update frontend at $HOST$REMOTE_DIR ? (y/n) " -n 1 -r
echo    # (optional) move to a new line
if [[ ! $REPLY =~ ^[Yy]$ ]]
then
    exit 1
    fi

rsync -avz -r $LOCAL_DIR/ $REMOTE_USER@$HOST:$REMOTE_DIR

