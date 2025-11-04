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

# Change ownership of the volume when writable
if [ -w /app ]; then
    for path in /app/*; do
        [ -e "$path" ] || continue
        if [ -w "$path" ]; then
            chown -R user:usergroup "$path" 2>/dev/null || true
        else
            echo "Skipping chown: $path is read-only"
        fi
    done
else
    echo "Skipping chown: /app is read-only"
fi

# Execute the command as user
exec gosu user "$@"
