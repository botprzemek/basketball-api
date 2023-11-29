# botprzemek's Basketball API

> [!Caution]
> <span id="status">Project is still work in progress</span>

<!-- TODO ADD IMAGES -->

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
   used for the project's core functionality. :toolbox:
2. [**TypeScript**](https://www.typescriptlang.org/docs): Superset of mentioned above JavaScript,
   used for adding static typing and enhancing code maintainability. :link:
3. [**CockroachDB**](https://www.cockroachlabs.com/docs): Database engine used for storing and
   retrieving team-related data. :file_folder:
4. [**Express**](https://expressjs.com/en/4x/api): Web application framework for building the API's
   routes and handling requests. :printer:
5. [**NodeJS**](https://nodejs.org/en/docs) An asynchronous event-driven JavaScript runtime, designed to build scalable network applications. :crystal_ball:
6. [**Node-Cache**](https://github.com/node-cache/node-cache): Caching mechanisms implemented using
   Node-Cache package to optimize API performance. :package:
7. [**Node-Mailer**](https://nodemailer.com/usage/): Allows easy as cake email sending. :mailbox:
8. [**Socket.IO**](https://socket.io/docs/v4/server-api): Caching mechanisms implemented using
   Node-Cache package to optimize API performance. :package:

## <span id="database">Database Models :abacus:</span>

These models define the structure of the sports-related database, including basketball arenas, local
cities, players, teams, statistics, matches, and rosters, along with their respective relationships.

### 1. City

- **id** (INT8): Primary key, unique identifier for the city.
- **name** (VARCHAR): Name of the city (not null, unique).
- **state** (VARCHAR): State of the city (not null).

**Indexes:**
- `name_idx`: Index on the name column.

### 2. Arena

- **id** (INT8): Primary key, unique identifier for the arena.
- **city_id** (INT8): Foreign key referencing the city table (not null, references city.id, on delete cascade).
- **name** (VARCHAR): Name of the arena (not null, unique).
- **location** (VARCHAR): Location of the arena (not null).

**Indexes:**
- `name_idx`: Index on the name column.
- `city_id_idx`: Index on the city_id column.

### 3. League

- **id** (INT8): Primary key, unique identifier for the league.
- **arena_id** (INT8): Foreign key referencing the arena table (not null, references arena.id, on delete cascade).
- **city_id** (INT8): Foreign key referencing the city table (not null, references city.id, on delete cascade).
- **name** (VARCHAR): Name of the league (not null, unique).

**Indexes:**
- `name_idx`: Index on the name column.
- `arena_id_idx`: Index on the arena_id column.
- `city_id_idx`: Index on the city_id column.

### 4. Match

- **id** (INT8): Primary key, unique identifier for the match.
- **arena_id** (INT8): Foreign key referencing the arena table (not null, references arena.id, on delete cascade).
- **league_id** (INT8): Foreign key referencing the league table (not null, references league.id, on delete cascade).
- **timestamp** (TIMESTAMP): Timestamp of the match (not null, unique).

**Indexes:**
- `timestamp_idx`: Index on the timestamp column.
- `arena_id_idx`: Index on the arena_id column.
- `league_id_idx`: Index on the league_id column.

### 5. Team

- **id** (INT8): Primary key, unique identifier for the team.
- **city_id** (INT8): Foreign key referencing the city table (not null, references city.id, on delete cascade).
- **league_id** (INT8): Foreign key referencing the league table (not null, references league.id, on delete cascade).
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

- **staff_id** (INT8): Foreign key referencing the staff table (not null, references staff.id, on delete cascade).
- **team_id** (INT8): Foreign key referencing the team table (not null, references team.id, on delete cascade).

**Indexes:**
- `staff_id_idx`: Index on the staff_id column.
- `team_id_idx`: Index on the team_id column.

### 8. Team_Statistics

- **id** (INT8): Primary key, unique identifier for the team statistics.
- **match_id** (INT8): Foreign key referencing the match table (not null, references match.id, on delete cascade, unique).
- **team_id** (INT8): Foreign key referencing the team table (not null, references team.id, on delete cascade).
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
- **match_id** (INT8): Foreign key referencing the match table (not null, references match.id, on delete cascade).
- **team_id** (INT8): Foreign key referencing the team table (not null, references team.id, on delete cascade).
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
- **match_id** (INT8): Foreign key referencing the match table (not null, references match.id, on delete cascade).
- **team_id** (INT8): Foreign key referencing the team table (not null, references team.id, on delete cascade).

**Indexes:**
- `match_id_idx`: Index on the match_id column.
- `team_id_idx`: Index on the team_id column.

### 11. Player

- **id** (INT8): Primary key, unique identifier for the player.
- **team_id** (INT8): Foreign key referencing the team table (not null, references team.id, on delete cascade).
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

- **player_id** (INT8): Foreign key referencing the player table (not null, references player.id, on delete cascade).
- **roster_id** (INT8): Foreign key referencing the roster table (not null, references roster.id, on delete cascade).

**Indexes:**
- `player_id_idx`: Index on the player_id column.
- `roster_id_idx`: Index on the roster_id column.

### 13. Player_Statistics

- **id** (INT8): Primary key, unique identifier for the player statistics.
- **match_id** (INT8): Foreign key referencing the match table (not null, references match.id, on delete cascade).
- **player_id** (INT8): Foreign key referencing the player table (not null, references player.id, on delete cascade).
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
- **match_id** (INT8): Foreign key referencing the match table (not null, references match.id, on delete cascade).
- **data** (VARCHAR): Backlog data (not null).
- **timestamp** (DATE): Timestamp of the backlog entry (not null, default current timestamp).

**Indexes:**
- `match_id_idx`: Index on the match_id column.

This documentation provides an overview of the database structure, including tables, columns, data types, and relationships. Use this as a reference for understanding the schema and designing queries for the PostgreSQL database.

## <span id="endpoints">Endpoints :satellite:</span>

<!-- TODO ENDPOINTS -->
