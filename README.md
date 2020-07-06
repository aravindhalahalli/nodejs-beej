# Nodejs Beej

This project is a [Node.js](https://nodejs.org/en/) boilerplate that can be used as a base to build your application.

The starter kit provides you with the modern tools for building scalable APIs. I have created the architecture by observing some common patterns.

[comment]: <> ([![NPM Version][npm-image]][npm-url])

[comment]: <> ([![Build Status][travis-image]][travis-url])

[comment]: <> ([![Downloads Stats][npm-downloads]][npm-url])

## Getting Started

- [Usage](#installation)
- [Tools and Libraries](#tools-and-libraries)
- [Security](#security)
- [Available commands](#available-commands)
- [SSL Certs](#ssl-certs)
- [Accessing MongoDB](#accessing-mongodb)
- [Environment file](#environment-file)
- [Database Backup & Restore](#database-backup-and-restore)
- [Path Resolver](#path-resolver)
- [Global Types](#global-types)
- [Testing](#testing)
- [Linting](#linting)
- [Release History](#release-history)
- [Contributing](#contributing)
- [Author](#author)
- [FAQ](#faq)
- [Support](#support)
- [License](#license)

## Usage

- You can either click on the `Use Template` button seen next to the `Clone` option on GitHub
- OR
- Clone the project - `git clone https://github.com/rashtay/react_native_beej.git <your project name>`

- Remove the previous git history: - `rm -rf .git/`
- Rename the project name in `package.json`
- Install [Docker Desktop](https://www.docker.com/products/docker-desktop) and start it
- If your running this project for the first time, run `yarn clean` to clean all your previous docker builds, containers and images. This is necessary as some of the container names from your previous build might conflict with the existing one. You can avoid running this command if you aren't facing any conflicts or by clearing only the container ids having a conflicting name.
- Run `yarn start`
- Remove the LICENSE file and the "License" section from the **README** if your project is not an open source project
- Update the existing `README.md` file with the content related to the app and app development.
- You can now create a new git repository for your project (using `git init`) and make the first commit.

## Tools and Libraries

The boilerplate has the following tools and libraries:

- [Node.js](https://nodejs.org/en/) a JavaScript runtime built on [Chrome's V8 JavaScript engine](https://v8.dev/)
- [Express.js](https://expressjs.com/) fast, unopinionated, minimalist web framework for [Node.js](https://nodejs.org/en/)
- [Redis](https://redis.io/) is an open source (BSD licensed), in-memory data structure store, used as a database, cache and message broker.
- [Helmet](https://helmetjs.github.io/) helps you secure your Express apps by setting various HTTP headers. _It’s not a silver bullet_, but it can help!
- [Express Rate Limit](https://github.com/nfriedly/express-rate-limit) is used to limit repeated requests to public APIs and/or endpoints such as password reset.
- [HPP](https://www.npmjs.com/package/hpp) middleware to **protect against HTTP Parameter Pollution attacks**
- [Typescript](https://www.typescriptlang.org/) for type checking and then compiling the code to plain/vanilla JavaScript
- [Webpack](https://webpack.js.org/) is used to compile JavaScript modules.
- [Docker](https://www.docker.com/) simplifies and accelerates your workflow, while giving developers the freedom to innovate with their choice of tools, application stacks, and deployment environments for each project.
- [Husky](https://www.npmjs.com/package/husky) to add precommit and prepush hooks
- [Lint Staged](https://www.npmjs.com/package/lint-staged) to lint the currently modified file
- [Prettier](https://prettier.io/), [TSLint](<[https://palantir.github.io/tslint/](https://palantir.github.io/tslint/)>) and [ESlint](https://eslint.org/) preconfigured for React Native

## Security

Following packages have been added by default to handle basic security checks:

- [Helmet](https://helmetjs.github.io/) helps you secure your Express apps by setting various HTTP headers. _It’s not a silver bullet_, but it can help!
- [Express Rate Limit](https://github.com/nfriedly/express-rate-limit) is used to limit repeated requests to public APIs and/or endpoints such as password reset.
- [HPP](https://www.npmjs.com/package/hpp) middleware to **protect against HTTP Parameter Pollution attacks**

## Available commands

- `docker-compose up`: For running our image
- `docker-compose up --build`: Rebuild and run our image
- `docker-compose up -d`: Launch the conatiner and run it in background
- `docker-compose down`: Stop all containers
- `docker-compose down -v --rmi all --remove-orphans`: Performs a clean shut down
- `docker-compose ps`: Display running containers

- `docker ps`: For listing the running container
- `docker ps -all`: To show all the containers that have ever been created on our machine
- `docker system prune`: Removes all containers and clears cache
- `docker stop <container-id>`: The container gets the SIGTERM signal and can take some time to stop to perform some clean up (e.g save file, emit msg, etc). Usually, after 10 seconds, docker stop would run the kill command
- `docker kill <container-id>`: The container gets the SIGKILL signal telling it to stop the container right away. Can use it if the container is stuck
- `docker exec -it <container-id> sh`: To start the terminal in the virtual machine. -it stands for accept input and 't' prettifies our output
- `docker build .`: Builds the container based on your docker file (fed to docker client) which is then delivered docker server which in turn builds a usable image
- `docker build -t rashtay/nodeapp:latest .`: Tag our container. Follow the naming convention
- `docker run -p -it 5000:5000 rashtay/nodeapp`: To run the tagged container and map ports

You might never make use of some of the above `docker` commands as `docker-compose` commands simplifies most of it for you.

## SSL Certs

Run

```
openssl req -newkey rsa:2048 -new -nodes -keyout key.pem -out csr.pem
openssl x509 -req -days 365 -in csr.pem -signkey key.pem -out server.crt
```

inside `sslcert` folder to start serving APIs via `HTTPS` protocol while developing the app.

## Accessing MongoDB

While using a GUI tool to access MongoDB, you can connect to the database via `localhost:27017` thanks to port forwarding.

Make sure, you stop the mongodb running in the host environment if you have installed it. You can run the below given command to stop mongodb if you have installed it using brew:

`brew services stop mongodb-community`

## Environment file

Create a `.env` file with the following properties:

```js
DBNAME={your-mongodb-database-name e.g `nodeapp`}
PORT={port at which the server should be running e.g `5000`}
REDIS_PORT={port at which redis would be running e.g `6379`}
```

No need to add the curly braces `{}`. It's just to show the placeholders. System has been configured to read it from the `.env` in the development mode.

You can add more environment variables and access it using `process.env` e.g `process.env.PORT`

`.env` is only required during development. While developing, you'd be adding the environment properties via the cloud/hosting service itself.

## Database backup and restore

Run the following command for backing up the db during development:

```
docker-compose exec -T <mongodb service> sh -c 'mongodump --archive' > db.dump
```

Run the following command for restoring the db:

```
docker-compose exec -T <mongodb service> sh -c 'mongorestore --archive' < db.dump
```

## Path resolver

- Let's say you have `auth.js` file in `src/routes/user/` and you want to import `utils/config.js`.
- So, instead of importing the file present in `utils` like `../../utils/config.js`, you can import it like `@utils/config`.
- All the aliases can be found in `webpack.config.js` and `tsconfig.json`.
- If you want to add/remove aliases, make sure you add/remove to and from both the files.

## Global types

We have a types folder placed in the `src` directory. It consists of the globals types being used across the project and third part module declarations that currently doesn't have typescript support.

## Testing

Jest has been configured for tests and assertions. You can replace it with the tool of your choice.

## Linting

The project comes preconfigured with `eslint` and `prettier` . `typescript` and `airbnb`'s proposal for typescript eslint has been added. The additional packages being used for linting has been listed below:

    "@types/compression": "^1.7.0",
    "@types/cors": "^2.8.6",
    "@types/express": "^4.17.6",
    "@types/express-rate-limit": "^5.0.0",
    "@types/helmet": "^0.0.47",
    "@types/hpp": "^0.2.1",
    "@types/morgan": "^1.9.1",
    "@types/node": "^14.0.13",
    "@types/redis": "^2.8.22",
    "@types/webpack": "^4.41.17",
    "@types/webpack-merge": "^4.1.5",
    "@typescript-eslint/eslint-plugin": "^3.3.0",
    "@typescript-eslint/parser": "^3.3.0",
    "eslint": "7.2.0",
    "eslint-config-airbnb-typescript": "^8.0.2",
    "eslint-config-prettier": "^6.11.0",
    "eslint-loader": "^4.0.2",
    "eslint-plugin-import": "^2.21.2",
    "prettier": "^2.0.5",
    "typescript": "^3.9.5"

The eslint, prettier and typescript configuration files have been updated to accomodate the additional plugins.

You cannot push the code if there are any lint or [type check](https://github.com/okonet/lint-staged/issues/468#issuecomment-605102567) issues unless you forcefully push it.
