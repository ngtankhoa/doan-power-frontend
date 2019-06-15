#!/bin/sh

set -ex

docker-compose -f "docker-compose.yml" up -d --build