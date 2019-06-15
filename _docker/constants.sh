#!/bin/sh

# Should keep persistent between service that linked with each others.

# Project Info
PROJECT_NAME="neuraldisplay"

# This Repo Info
IMAGE_NAME="power-mgmt-web"
VERSION="1.0.0"

ENV_FILE=../.env

# Other Services
API_NAME="power-api"
DB_NAME="power-db"
WEB_NAME="power-web"
NETWORK="power-network"

# Virtual Host

API_VIRTUAL_HOST="api.power.neuraldislay.xyz"
WEB_VIRTUAL_HOST="power.neuraldislay.xyz"
PORTAINER_VIRTUAL_HOST="portainer.neuraldislay.xyz"
GRAPHQL_VIRTUAL_HOST="graphql.neuraldislay.xyz"