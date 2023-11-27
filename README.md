# Basketball API

> [!Caution] > <span id="status">Project is still work in progress</span>

## <span id="overview">Project Overview :memo:</span>

Stack of whole project including
[website project](https://github.com/botprzemek/basketball-website) - **CENN (CockroachDB, Express,
Nuxt, NodeJS)**

This documentation provides an overview of the REST API project developed for the Knury Knurów
basketball team. The API is built around JavaScript (TypeScript :milky_way:) with Express :coffee:
framework (Node.js). It integrates technologies such as CockroachDB :cockroach: and Socket.IO
:satellite:, Node-Mailer :mailbox: and Node-Cache :eight_pointed_black_star: for caching.

## Navigation :busstop:

1. [Status](#status)
2. [Project Overview](#overview)
3. [Quick Start](#setup)
4. [Usage](#usage)
5. [Technologies used](#technologies)
6. [Database Models](#database)
7. [Endpoints](#endpoints)

## <span id="setup">Quick Start :rocket:</span>

Testing API instance running on [this link](https://api.testing.knuryknurow.pl/), please refer to
project's documentation about API endpoints

To run the project in development mode (Nodemon - Restarting after changes), execute the following
command:

```shell
npm run dev
```

To run the seeding script to fill your database, execute the following command:

```shell
npm run seed
```

To run the project in production mode (PM2 - daemonize app and logging), execute the following
command:

```shell
npm run server
```

## <span id="usage">Usage :tada:</span>

<!-- TODO API AND SOCKET -->

## <span id="technologies">Technologies Used :bulb:</span>

1. [**JavaScript**](https://developer.mozilla.org/en-US/docs/Web/JavaScript): Programming language
   used for the API's core functionality. :toolbox:
2. [**TypeScript**](https://www.typescriptlang.org/docs): Superset of mentioned above JavaScript,
   used for adding static typing and enhancing code maintainability. :link:
3. [**CockroachDB**](https://www.cockroachlabs.com/docs): Database engine used for storing and
   retrieving team-related data. :file_folder:
4. [**Express**](https://expressjs.com/en/4x/api): Web application framework for building the API's
   routes and handling requests. :printer:
5. [**Node-Cache**](https://github.com/node-cache/node-cache): Caching mechanisms implemented using
   Node-Cache package to optimize API performance. :package:
6. [**Node-Mailer**](https://nodemailer.com/usage/): Allows easy as cake email sending. :mailbox:
7. [**Socket.IO**](https://socket.io/docs/v4/server-api): Caching mechanisms implemented using
   Node-Cache package to optimize API performance. :package:

## <span id="database">Database Models :abacus:</span>

These models define the structure of the sports-related database, including basketball arenas, local
cities, players, teams, statistics, matches, and rosters, along with their respective relationships.

<!-- TODO MODELS -->

## <span id="endpoints">Endpoints :satellite:</span>

<!-- TODO ENDPOINTS -->
