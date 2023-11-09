# basketball-api

SENN - SurrealDB, Express, Nuxt, NodeJS

This documentation provides an overview of the REST API project developed for the Knury Knurów basketball team. The API is built using JavaScript + TypeScript :milky_way: with Express framework (Node.js), and it integrates technologies such as Supabase :sparkle:, Prisma :gem:, Socket.IO :loudspeaker:, and Node-Cache :eight_pointed_black_star: package for caching.

> [!WARNING] > <span id="status">Project is work in progress</span>

## Navigation :busstop:

1. [Status](#status)
2. [Project Overview](#overview)
3. [Quick Start](#setup)
4. [Usage](#usage)
5. [Technologies used](#technologies)
6. [Endpoints](#endpoints)
7. [Database Models](#database)
8. [TODO](#todo)

## <span id="overview">Project Overview :memo:</span>

The Knury Knurów basketball team REST API serves as an extension to the team's website, allowing administrator to manage player information, contact details, and other data that identifies the team. The API is designed to enhance the team's online presence by providing various functionalities to interact with team-related data.

## <span id="setup">Quick Start :rocket:</span>

Testing API instance running on [this link](https://api.testing.knuryknurow.pl/) (CORS is disabled for known reasons)

## <span id="usage">Usage :tada:</span>

To run the project in development mode (Nodemon - Restarting after changes), execute the following command:

```shell
npm run dev
```

To run the project in production mode (PM2 - daemonize app and logging), execute the following command:

```shell
npm run server
```

## <span id="technologies">Technologies Used :bulb:</span>

1. **JavaScript**: Programming language used for the API's core functionality. :toolbox:
2. **TypeScript**: Superset of mentioned above JavaScript, used for adding static typing and enhancing code maintainability. :link:
3. **Express**: Web application framework for building the API's routes and handling requests. :printer:
4. **Supabase**: Database service used for storing and retrieving team-related data. :file_folder:
5. **Prisma**: ORM (Object-Relational Mapping) tool for interacting with the database and managing data models. :floppy_disk:
6. **Node-Cache**: Caching mechanisms implemented using Node-Cache package to optimize API performance. :package:
7. **Node-Mailer**: Allows easy as cake email sending. :mailbox:
8. **Socket.IO**: Caching mechanisms implemented using Node-Cache package to optimize API performance. :package:

## <span id="endpoints">Endpoints :satellite:</span>

### 1. Get List of Players :basketball:

- **Endpoint**: `/players`
- **Method**: GET
- **Description**: This endpoint provides a list of players who are part of the basketball team. The API returns a JSON array containing player information such as names, positions, and contact details.

### 2. Generate Web Component :jigsaw:

- **Endpoint**: `/web`
- **Method**: GET
- **Description**: This endpoint returns a web component that can be embedded on the team's website. The web component facilitates the generation of specific content, such as displaying a phone number for contacting the team.

### 3. Fetch Files :framed_picture:

- **Endpoint**: `/files/:name/:extension`
- **Method**: GET
- **Description**: This endpoint allows users to fetch a file from Supabase by providing the file name and extension as parameters. The API returns a Blob of the specified file, which can be downloaded upon making the request.
- **Parameters**:
  - `name` - Name of the file.
  - `extension` - File's extension.

### 4. Send Match Notification Email :mailbox_with_mail:

- **Endpoint**: `/news`
- **Method**: POST
- **Description**: This endpoint enables sending match notification emails to users via NodeMailer. Users can submit a form to receive email notifications about upcoming matches. The API processes the form data and sends an email to the user's provided address inside request body.

### 5. Error Handling for Invalid Paths :axe:

- **Endpoint**: `/*`
- **Method**: GET
- **Description**: This endpoint handles requests made to non-existent paths and returns an error message indicating that the path is not recognized.

## <span id="database">Database Models :abacus:</span>

These models define the structure of the sports-related database, including players, teams, matches, and schedules, along with their respective relationships.

### 1. PlayerModel :bouncing_ball_person:

The PlayerModel model represents a player in a sports team.

- id: `Int (Primary Key)`
- team: `Team (Foreign key)`
- teamId: `Int`
- name: `String`
- lastname: `String`
- number: `Int`
- height: `Int`
- position: `Int`

### 2. Team :department_store:

The Team model represents a sports team.

- id: `Int (Primary Key)`
- name: `String`
- city: `String`
- players: `PlayerModel (Foreign key)`
- hostMatches: `Match (Foreign key)`
- opponentMatches: `Match (Foreign key)`
- won: `Int`
- lost: `Int`

### 3. Match :basketball:

The Match model represents a match between two teams.

- id: `Int (Primary Key)`
- schedule: `Schedule (Foreign key)`
- host: `Team (Foreign key)`
- opponent: `Team (Foreign key)`
- hostId: `Int`
- opponentId: `Int`
- hostPoints: `Int`
- opponentPoints: `Int`

### 4. Schedule :date:

The Schedule model represents the schedule of a match.

- id: `Int (Primary key)`
- match: `Match (Foreign key)`
- matchId: `Int`
- city: `String`
- datetime: `DateTime`

## <span id="todo">TODO :clipboard:</span>

- [ ] Match schedule
- [ ] Match score
- [ ] PlayerModel stats
- [ ] Players stats table
- [ ] Match protocol generator
- [ ] WEBSOCKETS FOR LIVE GAMEPLAY
