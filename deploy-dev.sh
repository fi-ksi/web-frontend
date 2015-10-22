#!/bin/bash

LOCAL_DIR="dist"
REMOTE_USER="root"
HOST="kyzikos.fi.muni.cz"
REMOTE_DIR="/var/www/ksi-dev"

rsync -avz -r $LOCAL_DIR/ $REMOTE_USER@$HOST:$REMOTE_DIR

