#!/bin/sh

# Print out current command and exit as soon as any line in the script fails
set -ex

source ./constants.sh .

NODE_ENV="${1:-production}"

if [ "$NODE_ENV" = "development" ]; then
  VERSION="$VERSION-dev"
fi

# Remove first if existed
# docker rmi $IMAGE_NAME:$VERSION

# Copy SSH keys for Docker builder to pull code from private repositories.
# \cp -Rf ~/.ssh ./.ssh

# Override buildtime variables
# NOTICE: build_context: '..' - meaning in root project (power-management-frontend)

docker build \
  --build-arg NODE_ENV=$NODE_ENV \
  -t $IMAGE_NAME:$VERSION \
  -f ./Dockerfile ..

# docker tag SOURCE_IMAGE[:TAG] TARGET_IMAGE[:TAG]
# docker tag $IMAGE_NAME:$VERSION $PROJECT_NAME/$IMAGE_NAME:$VERSION

# Only push Run Image not include Source Code
# docker push $PROJECT_NAME/$IMAGE_NAME:$VERSION


# Delete ssh key after use
# \rm -rf ./.ssh