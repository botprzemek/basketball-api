# botprzemek's Basketball API

Development

npm run install

npm run dev

Building

npm run install

npm run build

npm run start

Deployment

docker compose up

> [!Caution]
> <span id="status">Project is still work in progress</span>

https://youtu.be/_1IKwnbscQU?si=U3HJeYzsupcBohvN
https://youtu.be/GmXPwRNIrAU?si=RJVPFVS1AHvJag6-
https://youtu.be/6WZ6S-qmtqY?si=eePsuPFUwczIGOVi
https://youtu.be/_gQaygjm_hg?si=WGZect2sf7qOBT8O

NGINX rate limiter

middlewares
accessList.ts
accessToken.ts
dataValidation.ts
headers.ts
webToken.ts
utils
logger.ts
paginate.ts
queryParameter.ts
rateLimiter.ts
version.ts

tests
server
api
delete
get
post
put

services
analitics
auth
data

TODO

- ADD IMAGES

1. Cache invalidation

With cache invalidation, whenever a value is updated in the primary database, each cached item with a corresponding key
is automatically deleted from the cache or caches. Although cache invalidation could perhaps be seen as a “brute force
approach,” the advantage is that it requires only one costly and often time-consuming write—to the primary database
itself—instead of two or more.

2. Write-through caching

In this case, rather than updating the primary database and removing the cache, with the write-through strategy, the
application updates the cache, and then the cache updates the primary database synchronously. In other words, instead of
relying on the primary database to initiate any updating, the cache is in charge of maintaining its own consistency and
delivering word of any changes it makes back to the primary database.

3. Write-behind caching

Unfortunately, there are times when two writes can actually make a wrong. One of the drawbacks of the write-through
cache strategy is that updating both the cache and the primary database requires two time-consuming, processor-taxing
changes, first to the cache and then to the primary database.

Another strategy, known as write-behind, avoids this problem by initially updating only the cache and then updating the
primary database later. Of course, the primary database will also need to be updated, and the sooner the better, but in
this case the user doesn’t have to pay the “cost” of the two writes. The second write to the primary database occurs
asynchronously and behind the scenes (hence the name, write-behind) at a time when it is less likely to impair
performance.

Auth

Hypermedia HATEOAS

GZIP Compression

GET, POST, PUT, DELETE

NODEJS, TYPESCRIPT, HTTP, REDIS, COCKROACH, DOCKER, MULTI-INSTANCE

statistics

parameters

database schema

api token

rate limit

ip exclude

admin ui

tests

swagger
openapi

mocking

deployment

## <span id="overview">Project Overview :memo:</span>

Stack of whole project including
[website project](https://github.com/botprzemek/basketball-website) - **CENN (CockroachDB, Express,
Nuxt, NodeJS)**

This documentation provides an overview of the REST API project developed for the Knury Knurów
basketball team. The API is built around JavaScript (TypeScript :milky_way:) with Express :coffee:
framework (Node.js). It integrates technologies such as CockroachDB :cockroach: and Socket.IO
:satellite:, Node-Mailer :mailbox: and Node-Cache :eight_pointed_black_star:

## Navigation :busstop:

1. [Status](#status)
2. [Project Overview](#overview)
3. [Quick Start](#setup)
4. [Features](#features)
5. [Usage](#usage)
6. [Technologies used](#technologies)
7. [Endpoints](#endpoints)
8. [Database Models](#database)
9. [Contributors](#contributors)
10. [Author](#author)
11. [License](#license)

## <span id="setup">Quick Start :rocket:</span>

Testing API instance running on [this link](https://api.testing.knuryknurow.pl/), please refer to
API's endpoints

1. Install Node

2. Clone repository git clone https://github.com/botprzemek/basketball-api.git

cd basketball-api

npm install

cp .env.example .env

setup env file

```dotenv
PORT=3000
ADDRESSES=["http://localhost:3001"]

SECRET=generated_secret

COCKROACH_HOST=your.database.domain.com
COCKROACH_PORT=26257
COCKROACH_NAME=api
COCKROACH_USER=your_user
COCKROACH_PASSWORD=your_database_password

MAIL_URL=your.mail.domain.com
MAIL_PORT=587
MAIL_USER=your_user
MAIL_PASSWORD=your_mail_password

TOKEN_KEY=generated_token
```

npm run dev

To run the project in development mode (Nodemon - Restarting after changes), execute the following
command:

```shell
npm run dev
```

To run the seeding script to fill your database, execute the following command:

```shell
npm run seedling
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
   used for the project's core functionality. :toolbox:
2. [**TypeScript**](https://www.typescriptlang.org/docs): Superset of mentioned above JavaScript,
   used for adding static typing and enhancing code maintainability. :link:
3. [**Node**](https://nodejs.org/en/docs) An asynchronous event-driven JavaScript runtime, designed
   to build scalable network applications. :crystal_ball:
4. [**CockroachDB**](https://www.cockroachlabs.com/docs): Database engine used for storing and
   retrieving team-related data. :file_folder:
5. [**Express**](https://expressjs.com/en/4x/api): Web application framework for building the API's
   routes and handling requests. :printer:
6. [**Node-Cache**](https://github.com/node-cache/node-cache): Caching mechanisms implemented using
   Node-Cache package to optimize API performance. :package:
7. [**Node-Mailer**](https://nodemailer.com/usage/): Allows easy as cake email sending. :mailbox:
8. [**Socket.IO**](https://socket.io/docs/v4/server-api): Caching mechanisms implemented using
   Node-Cache package to optimize API performance. :package:

## <span id="database">Database Models :abacus:</span>

This section provides an overview of the structure, including basketball arenas, cities, players,
teams, statistics, matches, and rosters, along with their respective relationships inside the
CockroachDB database.

### 1. City

- **id** (INT8): Primary key, unique identifier for the city.
- **name** (VARCHAR): Name of the city (not null, unique).
- **state** (VARCHAR): State of the city (not null).

**Indexes:**

- `name_idx`: Index on the name column.

### 2. Arena

- **id** (INT8): Primary key, unique identifier for the arena.
- **city_id** (INT8): Foreign key referencing the city table (not null, references city.id, on
  delete cascade).
- **name** (VARCHAR): Name of the arena (not null, unique).
- **location** (VARCHAR): Location of the arena (not null).

**Indexes:**

- `name_idx`: Index on the name column.
- `city_id_idx`: Index on the city_id column.

### 3. League

- **id** (INT8): Primary key, unique identifier for the league.
- **arena_id** (INT8): Foreign key referencing the arena table (not null, references arena.id, on
  delete cascade).
- **city_id** (INT8): Foreign key referencing the city table (not null, references city.id, on
  delete cascade).
- **name** (VARCHAR): Name of the league (not null, unique).

**Indexes:**

- `name_idx`: Index on the name column.
- `arena_id_idx`: Index on the arena_id column.
- `city_id_idx`: Index on the city_id column.

### 4. Match

- **id** (INT8): Primary key, unique identifier for the match.
- **arena_id** (INT8): Foreign key referencing the arena table (not null, references arena.id, on
  delete cascade).
- **league_id** (INT8): Foreign key referencing the league table (not null, references league.id,
  on delete cascade).
- **timestamp** (TIMESTAMP): Timestamp of the match (not null, unique).

**Indexes:**

- `timestamp_idx`: Index on the timestamp column.
- `arena_id_idx`: Index on the arena_id column.
- `league_id_idx`: Index on the league_id column.

### 5. Team

- **id** (INT8): Primary key, unique identifier for the team.
- **city_id** (INT8): Foreign key referencing the city table (not null, references city.id, on
  delete cascade).
- **league_id** (INT8): Foreign key referencing the league table (not null, references league.id,
  on delete cascade).
- **name** (VARCHAR): Name of the team (not null, unique).
- **won** (INT8): Number of matches won by the team (not null, default 0).
- **lost** (INT8): Number of matches lost by the team (not null, default 0).

**Indexes:**

- `name_idx`: Index on the name column.
- `city_id_idx`: Index on the city_id column.
- `league_id_idx`: Index on the league_id column.

### 6. Staff

- **id** (INT8): Primary key, unique identifier for the staff.
- **name** (VARCHAR): First name of the staff (not null).
- **lastname** (VARCHAR): Last name of the staff (not null).
- **role** (role_enum): Role of the staff (not null).

**Indexes:**

- `name_idx`: Index on the name column.
- `role_idx`: Index on the role column.

### 7. Team_Staff

- **staff_id** (INT8): Foreign key referencing the staff table (not null, references staff.id, on
  delete cascade).
- **team_id** (INT8): Foreign key referencing the team table (not null, references team.id, on
  delete cascade).

**Indexes:**

- `staff_id_idx`: Index on the staff_id column.
- `team_id_idx`: Index on the team_id column.

### 8. Team_Statistics

- **id** (INT8): Primary key, unique identifier for the team statistics.
- **match_id** (INT8): Foreign key referencing the match table (not null, references match.id, on
  delete cascade, unique).
- **team_id** (INT8): Foreign key referencing the team table (not null, references team.id, on
  delete cascade).
- **assists** (INT8): Number of assists by the team.
- **rebounds_off** (INT8): Number of offensive rebounds by the team.
- **rebounds_def** (INT8): Number of defensive rebounds by the team.
- **inside_fgm** (INT8): Number of inside field goals made by the team.
- **inside_fga** (INT8): Number of inside field goals attempted by the team.
- **outside_fgm** (INT8): Number of outside field goals made by the team.
- **outside_fga** (INT8): Number of outside field goals attempted by the team.
- **freethrows_fgm** (INT8): Number of free throws made by the team.
- **freethrows_fga** (INT8): Number of free throws attempted by the team.
- **blocks** (INT8): Number of blocks by the team.
- **steals** (INT8): Number of steals by the team.
- **turnovers** (INT8): Number of turnovers by the team.
- **fouls** (INT8): Number of fouls by the team.

**Indexes:**

- `match_id_idx`: Index on the match_id column.
- `team_id_idx`: Index on the team_id column.

### 9. Quarter_Statistics

- **id** (INT8): Primary key, unique identifier for the quarter statistics.
- **match_id** (INT8): Foreign key referencing the match table (not null, references match.id, on
  delete cascade).
- **team_id** (INT8): Foreign key referencing the team table (not null, references team.id, on
  delete cascade).
- **quarter** (INT8): Quarter number.
- **assists** (INT8): Number of assists in the quarter.
- **rebounds_off** (INT8): Number of offensive rebounds in the quarter.
- **rebounds_def** (INT8): Number of defensive rebounds in the quarter.
- **inside_fgm** (INT8): Number of inside field goals made in the quarter.
- **inside_fga** (INT8): Number of inside field goals attempted in the quarter.
- **outside_fgm** (INT8): Number of outside field goals made in the quarter.
- **outside_fga** (INT8): Number of outside field goals attempted in the quarter.
- **freethrows_fgm** (INT8): Number of free throws made in the quarter.
- **freethrows_fga** (INT8): Number of free throws attempted in the quarter.
- **blocks** (INT8): Number of blocks in the quarter.
- **steals** (INT8): Number of steals in the quarter.
- **turnovers** (INT8): Number of turnovers in the quarter.
- **fouls** (INT8): Number of fouls in the quarter.

**Indexes:**

- `match_id_idx`: Index on the match_id column.
- `team_id_idx`: Index on the team_id column.

### 10. Roster

- **id** (INT8): Primary key, unique identifier for the roster.
- **match_id** (INT8): Foreign key referencing the match table (not null, references match.id, on
  delete cascade).
- **team_id** (INT8): Foreign key referencing the team table (not null, references team.id, on
  delete cascade).

**Indexes:**

- `match_id_idx`: Index on the match_id column.
- `team_id_idx`: Index on the team_id column.

### 11. Player

- **id** (INT8): Primary key, unique identifier for the player.
- **team_id** (INT8): Foreign key referencing the team table (not null, references team.id, on
  delete cascade).
- **name** (VARCHAR): First name of the player (not null).
- **lastname** (VARCHAR): Last name of the player (not null).
- **number** (INT8): Player number (not null, unique within a team).
- **height** (INT8): Height of the player (not null).
- **position** (position_enum): Position of the player (not null).
- **birthday** (DATE): Birthday of the player (not null).
- **starter** (BOOLEAN): Indicates if the player is a starter (default false).

**Indexes:**

- `name_idx`: Index on the name column.
- `lastname_idx`: Index on the lastname column.
- `team_id_idx`: Index on the team_id column.
- Unique constraint on `(team_id, number)`.

### 12. Player_Roster

- **player_id** (INT8): Foreign key referencing the player table (not null, references player.id,
  on delete cascade).
- **roster_id** (INT8): Foreign key referencing the roster table (not null, references roster.id,
  on delete cascade).

**Indexes:**

- `player_id_idx`: Index on the player_id column.
- `roster_id_idx`: Index on the roster_id column.

### 13. Player_Statistics

- **id** (INT8): Primary key, unique identifier for the player statistics.
- **match_id** (INT8): Foreign key referencing the match table (not null, references match.id, on
  delete cascade).
- **player_id** (INT8): Foreign key referencing the player table (not null, references player.id,
  on delete cascade).
- **minutes** (INT8): Number of minutes played by the player.
- **assists** (INT8): Number of assists by the player.
- **rebounds_off** (INT8): Number of offensive rebounds by the player.
- **rebounds_def** (INT8): Number of defensive rebounds by the player.
- **inside_fgm** (INT8): Number of inside field goals made by the player.
- **inside_fga** (INT8): Number of inside field goals attempted by the player.
- **outside_fgm** (INT8): Number of outside field goals made by the player.
- **outside_fga** (INT8): Number of outside field goals attempted by the player.
- **freethrows_fgm** (INT8): Number of free throws made by the player.
- **freethrows_fga** (INT8): Number of free throws attempted by the player.
- **blocks** (INT8): Number of blocks by the player.
- **steals** (INT8): Number of steals by the player.
- **turnovers** (INT8): Number of turnovers by the player.
- **fouls** (INT8): Number of fouls by the player.

**Indexes:**

- `match_id_idx`: Index on the match_id column.
- `player_id_idx`: Index on the player_id column.
- Unique constraint on `(match_id, player_id)`.

### 14. Backlog

- **id** (INT8): Primary key, unique identifier for the backlog.
- **match_id** (INT8): Foreign key referencing the match table (not null, references match.id, on
  delete cascade).
- **data** (VARCHAR): Backlog data (not null).
- **timestamp** (DATE): Timestamp of the backlog entry (not null, default current timestamp).

**Indexes:**

- `match_id_idx`: Index on the match_id column.

## <span id="endpoints">Endpoints :satellite:</span>

<!-- TODO ENDPOINTS -->

Contributors

This project follows the all-contributors specification and is brought to you by these awesome
contributors.

author

Github @botprzemek Discord botprzemek Email info@botprzemek.pl

license

This project is licensed under the terms of the Apache License 2.0

http2 protobuf
