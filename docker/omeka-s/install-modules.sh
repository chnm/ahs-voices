#!/bin/sh
# Install modules from /srv/plugins/*.zip into Omeka S modules directory
MODULES_DIR="/var/www/html/modules"

if [ -d /srv/plugins ]; then
    for zip in /srv/plugins/*.zip; do
        [ -f "$zip" ] || continue
        name=$(basename "$zip" .zip)
        # Strip version suffix (e.g. FacetedBrowse-1.9.2 -> FacetedBrowse)
        module=$(echo "$name" | sed 's/-[0-9].*//')
        if [ ! -d "$MODULES_DIR/$module" ]; then
            echo "Installing module: $module"
            unzip -q -o "$zip" -d "$MODULES_DIR"
        else
            echo "Module already installed: $module"
        fi
    done
fi

# Hand off to the original CMD
exec "$@"
