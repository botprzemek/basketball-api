# basketball-api

This documentation provides an overview of the REST API project developed for the Knury Knurów basketball team. The API is built using JavaScript + TypeScript :milky_way: with Express framework (Node.js), and it integrates technologies such as Supabase :sparkle:, Prisma :gem:, and Node-Cache :eight_pointed_black_star: package for caching.

## Navigation

Easily jump between various topics

### [1. Status](#status)
### [2. Project Overview](#overview)
### [3. Setup](#setup)
### [4. Usage](#usage)
### [5. Technologies used](#technologies)
### [7. Endpoints](#endpoints)
### [8. Database Models](#database)
### [9. TODO](#todo)

> [!WARNING]
> <p id="status">Project is work in progress :construction:</p>


## <p id="overview">Project Overview</p>

The Knury Knurów basketball team REST API serves as an extension to the team's website, allowing administrator to manage player information, contact details, and other data that identifies the team. The API is designed to enhance the team's online presence by providing various functionalities to interact with team-related data.

## <p id="setup">Setup</p>

## <p id="usage">Usage</p>

To run the project in development mode  (Nodemon - Restarting after changes), execute the following command:

```shell
npm run dev
```

To run the project in production mode (PM2 - daemonize app and logging), execute the following command:

```shell
npm run server
```

## <p id="technologies">Technologies Used</p>

1. **JavaScript**: Programming language used for the API's core functionality. :toolbox:
2. **TypeScript**: Superset of mentioned above JavaScript, used for adding static typing and enhancing code maintainability. :link:
3. **Express**: Web application framework for building the API's routes and handling requests. :printer:
4. **Supabase**: Database service used for storing and retrieving team-related data. :file_folder:
5. **Prisma**: ORM (Object-Relational Mapping) tool for interacting with the database and managing data models. :floppy_disk:
6. **Node-Cache**: Caching mechanisms implemented using Node-Cache package to optimize API performance. :package:
7. **Node-Mailer**:  Allows easy as cake email sending. :mailbox:

## <p id="endpoints">Endpoints</p>

### 1. Get List of Players

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

## <p id="database">Database Models :abacus:</p>

These models define the structure of the sports-related database, including players, teams, matches, and schedules, along with their respective relationships.

### 1. Player :bouncing_ball_person:

The Player model represents a player in a sports team.

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
- players: `Player (Foreign key)`
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

## <p id="todo">TODO :clipboard:</p>

- [ ] Match schedule
- [ ] Match score
- [ ] Player stats
- [ ] Players stats table