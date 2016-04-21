#!/bin/bash

# This script requires ksi-dev to be defined in .ssh/config

LOCAL_DIR="dist"
REMOTE_USER="root"
HOST="ksi-dev"
REMOTE_DIR="/var/www/ksi-dev"

rsync -avz --delete -r $LOCAL_DIR/ $REMOTE_USER@$HOST:$REMOTE_DIR

