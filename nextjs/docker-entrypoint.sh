#!/bin/sh
set -ea

if [ "$1" = "next" ]; then

  if [ ! -f "package.json" ]; then

    echo "Using Next.js v$NEXTJS_VERSION"
    echo "No project found at /srv/app. Creating a new Next.js project..."

    npx create-next-app .

  elif [ ! -d "node_modules" ] || [ ! "$(ls -qAL node_modules 2>/dev/null)" ]; then

    echo "Node modules not installed. Installing..."

    yarn install

  fi

  echo "Starting your app..."

  chown 1000:1000 -R /srv/app

  yarn dev
else

  exec "$@"

fi
