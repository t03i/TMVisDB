#!/bin/bash
set -e

# Add local user and group
if [ -z "$PUID" ]; then
    PUID=1000
fi

if [ -z "$PGID" ]; then
    PGID=1000
fi

echo "Starting with UID: $PUID, GID: $PGID"

getent group usergroup >/dev/null 2>&1 || groupadd -g "$PGID" usergroup
getent passwd user >/dev/null 2>&1 || useradd -u "$PUID" -g "$PGID" -m -s /bin/bash user

# Change ownership of the volume
chown -R user:usergroup /app

# Execute the command as user
exec gosu user "$@"
