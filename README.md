# Power Management React Web

## Run

## Release

Serve build static files by `nginx` as a web server

- Reduce the file size of final image
- Can push to Private Regitry

**By Docker**

```bash
cd _docker
./build-image.sh
# -> image: power-mgmt-web:[TAG_VERSION]

# test run container only
docker run -d -rm -it -p 3001:80 power-mgmt-web:1.0.0
```

Compose

If run alone docker-compose will not link to others services of `Power Management Project` use `power-mgmt-docker` for deploy full services.

## NOTICE

Please exclude `.env` in `.dockerignore` because the template `material-dashboard-pro-react` use the Root Source Point `NODE_PATH=./src` for loading modules. Read more issue [here](https://demos.creative-tim.com/material-dashboard-pro-react/#/documentation/tutorial)

DO NOT PUT **SENSITIVE** information in `.env` file.