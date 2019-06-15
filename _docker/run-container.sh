#!/bin/sh

# Print out current command and exit as soon as any line in the script fails
set -ex

source ./constants.sh .

NODE_ENV="${1:-production}"

if [ "$NODE_ENV" = "production" ]; then
  docker run \
  -d \
  --name=$IMAGE_NAME \
  --hostname=${WEB_NAME} \
  --network=${NETWORK} \
  --env-file=${ENV_FILE} \
  -e VIRTUAL_HOST=${WEB_VIRTUAL_HOST} \
  -p 3001:80 \
  $IMAGE_NAME:$VERSION

elif [ "$NODE_ENV" = "development" ]; then
  # VERSION="$VERSION-dev"

  # docker run \
  # --rm -it \
  # --name web \
  # --env-file=${ENV_FILE} \
  # --volume ${PWD}:/usr/src/app \
  # --volume /usr/src/app/node_modules \
  # -p 3000:3000 \
  # $IMAGE_NAME:$VERSION

  echo "WIP Not support yet, please run production"
fi

# Debug if something wrong - exit code 1 @@!
# docker run -it --entrypoint /bin/bash $IMAGE_NAME:$VERSION -s
