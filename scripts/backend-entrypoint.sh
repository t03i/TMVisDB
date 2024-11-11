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

groupadd -g "$PGID" usergroup
useradd -u "$PUID" -g "$PGID" -m -s /bin/bash user

# Change ownership of the volume
chown -R user:usergroup /project

# Execute the command as user
exec gosu user "sh -c '$@'"
