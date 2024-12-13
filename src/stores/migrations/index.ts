import { get } from "@/stores/database";

import { type Knex } from "knex";

const tables = {
  leagues: (table) => {
    table.uuid("id").primary().defaultTo(get().fn.uuid());
    table.string("name").notNullable();
    table.timestamps(true, true);
    table.timestamp("deleted_at").nullable();
    table.boolean("is_deleted").defaultTo(false);
  },
  seasons: (table) => {
    table.uuid("id").primary().defaultTo(get().fn.uuid());
    table.uuid("league_id").references("id").inTable("leagues").onDelete("CASCADE");
    table.string("name").nullable();
    table.timestamp("started_at").notNullable();
    table.timestamp("finished_at").notNullable();
    table.timestamps(true, true);
    table.timestamp("deleted_at").nullable();
    table.boolean("is_deleted").defaultTo(false);
  },
  teams: (table) => {
    table.uuid("id").primary().defaultTo(get().fn.uuid());
    table.uuid("league_id").references("id").inTable("leagues").onDelete("CASCADE");
    table.string("name").notNullable();
    table.timestamps(true, true);
    table.timestamp("deleted_at").nullable();
    table.boolean("is_deleted").defaultTo(false);
  },
  standings: (table) => {
    table.uuid("id").primary().defaultTo(get().fn.uuid());
    table.uuid("season_id").references("id").inTable("seasons").onDelete("CASCADE");
    table.uuid("team_id").references("id").inTable("teams").onDelete("CASCADE");
    table.integer("wins").defaultTo(0).notNullable();
    table.integer("loses").defaultTo(0).notNullable();
  },
  identities: (table) => {
    table.uuid("id").primary().defaultTo(get().fn.uuid());
    table.string("first_name").notNullable();
    table.string("last_name").notNullable();
    table.string("email").nullable();
    table.string("phone").nullable();
  },
  physical_attributes: (table) => {
    table.uuid("id").primary().defaultTo(get().fn.uuid());
    table.float("weight").nullable();
    table.float("height").nullable();
    table.float("wingspan").nullable();
    table.timestamp("effected_at").defaultTo(get().fn.now());
    table.timestamp("expired_at").nullable();
  },
  players: (table) => {
    table.uuid("id").primary().defaultTo(get().fn.uuid());
    table.uuid("identity_id").references("id").inTable("identities").onDelete("CASCADE");
    table.uuid("physical_attributes_id").references("id").inTable("physical_attributes").onDelete("CASCADE");
    table.uuid("team_id").references("id").inTable("teams").onDelete("CASCADE");
    table.integer("number").nullable();
    table.string("position").nullable();
    table.string("main_hand").nullable();
    table.date("birth_date").nullable();
    table.timestamps(true, true);
    table.timestamp("deleted_at").nullable();
    table.boolean("is_deleted").defaultTo(false);
  },
  coaches: (table) => {
    table.uuid("id").primary().defaultTo(get().fn.uuid());
    table.uuid("identity_id").references("id").inTable("identities").onDelete("CASCADE");
    table.uuid("team_id").references("id").inTable("teams").onDelete("CASCADE");
    table.timestamps(true, true);
    table.timestamp("deleted_at").nullable();
    table.boolean("is_deleted").defaultTo(false);
  },
  arenas: (table) => {
    table.uuid("id").primary().defaultTo(get().fn.uuid());
    table.string("name").notNullable();
    table.string("location").nullable();
  },
  schedules: (table) => {
    table.uuid("id").primary().defaultTo(get().fn.uuid());
    table.uuid("arena_id").references("id").inTable("arenas").onDelete("SET NULL");
    table.timestamp("started_at").defaultTo(get().fn.now());
    table.timestamp("finished_at").nullable();
  },
  matches: (table) => {
    table.uuid("id").primary().defaultTo(get().fn.uuid());
    table.uuid("schedule_id").references("id").inTable("schedules").onDelete("CASCADE");
    table.uuid("home_id").references("id").inTable("teams").onDelete("CASCADE");
    table.uuid("guest_id").references("id").inTable("teams").onDelete("CASCADE");
  },
  quarters: (table) => {
    table.uuid("id").primary().defaultTo(get().fn.uuid());
    table.uuid("match_id").references("id").inTable("matches").onDelete("CASCADE");
    table.integer("quarter_number").notNullable();
    table.timestamp("started_at").nullable();
    table.timestamp("ended_at").nullable();
  },
  player_quarter_statistics: (table) => {
    table.uuid("id").primary().defaultTo(get().fn.uuid());
    table.uuid("player_id").references("id").inTable("players").onDelete("CASCADE");
    table.uuid("quarter_id").references("id").inTable("quarters").onDelete("CASCADE");
    table.integer("minutes").defaultTo(0);
    table.integer("two_fgm").defaultTo(0);
    table.integer("two_fga").defaultTo(0);
    table.integer("three_fgm").defaultTo(0);
    table.integer("three_fga").defaultTo(0);
    table.integer("freethrow_fgm").defaultTo(0);
    table.integer("freethrow_fga").defaultTo(0);
    table.integer("offensive_rebounds").defaultTo(0);
    table.integer("defensive_rebounds").defaultTo(0);
    table.integer("assists").defaultTo(0);
    table.integer("steals").defaultTo(0);
    table.integer("blocks").defaultTo(0);
    table.integer("turnovers").defaultTo(0);
    table.integer("fouls").defaultTo(0);
  },
  match_logs: (table) => {
    table.uuid("id").primary().defaultTo(get().fn.uuid());
    table.uuid("player_id").references("id").inTable("players").onDelete("CASCADE");
    table.uuid("quarter_id").references("id").inTable("quarters").onDelete("CASCADE");
    table.integer("x_position").nullable();
    table.integer("y_position").nullable();
    table.string("type").nullable();
    table.boolean("is_succeed").defaultTo(false);
    table.timestamp("created_at").defaultTo(get().fn.now());
  },
  player_injuries: (table) => {
    table.uuid("id").primary().defaultTo(get().fn.uuid());
    table.uuid("player_id").references("id").inTable("players").onDelete("CASCADE");
    table.string("severity").notNullable();
    table.text("description").nullable();
    table.timestamp("started_at").notNullable();
    table.timestamp("recovered_at").notNullable();
  },
  trainings: (table) => {
    table.uuid("id").primary().defaultTo(get().fn.uuid());
    table.uuid("team_id").references("id").inTable("teams").onDelete("CASCADE");
    table.text("description").nullable();
    table.timestamp("started_at").notNullable();
    table.timestamp("ended_at").notNullable();
  },
  player_trainings: (table) => {
    table.uuid("player_id").references("id").inTable("players").onDelete("CASCADE");
    table.uuid("training_id").references("id").inTable("trainings").onDelete("CASCADE");
    table.primary(["player_id", "training_id"]);
  },
  achievements: (table) => {
    table.uuid("id").primary().defaultTo(get().fn.uuid());
    table.string("title").notNullable();
    table.text("description").nullable();
    table.timestamp("achieved_at").notNullable();
  },
} satisfies Record<string, (table: Knex.CreateTableBuilder) => void>;

(async () => {
    const entries = Object.entries(tables);

    for (const [name] of [...entries].reverse()) {
        await get().schema.dropTableIfExists(name);
    };

    for (const [name, schema] of entries) {
        await get().schema.createTable(name, schema);
    }
})();

(async () => {
    const [league] = await get().insert({
        name: 'NBA',
    }).into('leagues').returning('id');

    // Insert Team
    const [team] = await get().insert({
        league_id: league.id,
        name: 'Golden State Warriors',
        created_at: new Date(),
        updated_at: new Date(),
    }).into('teams').returning('id');

    // Insert Coach
    const [coachIdentity] = await get().insert({
        first_name: 'Steve',
        last_name: 'Kerr',
    }).into('identities').returning('id');

    await get().insert({
        identity_id: coachIdentity.id,
        team_id: team.id,
        created_at: new Date(),
        updated_at: new Date(),
    }).into('coaches');

    // Insert Players
    const players = [
        { firstName: 'Stephen', lastName: 'Curry', number: 30, position: 'PG', mainHand: 'Right' },
        { firstName: 'Klay', lastName: 'Thompson', number: 11, position: 'SG', mainHand: 'Right' },
        { firstName: 'Draymond', lastName: 'Green', number: 23, position: 'PF', mainHand: 'Right' },
        { firstName: 'Andrew', lastName: 'Wiggins', number: 22, position: 'SF', mainHand: 'Right' },
        { firstName: 'Kevon', lastName: 'Looney', number: 5, position: 'C', mainHand: 'Right' },
        { firstName: 'Chris', lastName: 'Paul', number: 3, position: 'PG', mainHand: 'Right' },
        { firstName: 'Gary', lastName: 'Payton II', number: 8, position: 'SG', mainHand: 'Right' },
        { firstName: 'Moses', lastName: 'Moody', number: 4, position: 'SF', mainHand: 'Right' },
        { firstName: 'Jonathan', lastName: 'Kuminga', number: 0, position: 'PF', mainHand: 'Right' },
        { firstName: 'Dario', lastName: 'Šarić', number: 20, position: 'C', mainHand: 'Right' },
        { firstName: 'Brandon', lastName: 'Pajkic', number: 10, position: 'SF', mainHand: 'Right' },
        { firstName: 'Trayce', lastName: 'Jackson-Davis', number: 55, position: 'PF', mainHand: 'Right' },
    ];

    const playerIds = [];
    for (const _player of players) {
        const [identity] = await get().insert({
            first_name: _player.firstName,
            last_name: _player.lastName,
        }).into('identities').returning('id');

        const [physicalAttributes] = await get().insert({
            weight: null,
            height: null,
            wingspan: null,
            effected_at: new Date(),
        }).into('physical_attributes').returning('id');

        const [player] = await get().insert({
            identity_id: identity.id,
            physical_attributes_id: physicalAttributes.id,
            team_id: team.id,
            number: _player.number,
            position: _player.position,
            main_hand: _player.mainHand,
            birth_date: null,
            created_at: new Date(),
            updated_at: new Date(),
        }).into('players').returning('id');

        playerIds.push(player.id);
    }

    // Insert Arena, Schedule, and Matches
    const [arena] = await get().insert({
        name: 'Chase Center',
        location: 'San Francisco, CA',
    }).into('arenas').returning('id');

    const [schedule] = await get().insert({
        arena_id: arena.id,
        started_at: new Date(),
    }).into('schedules').returning('id');

    const [match1] = await get().insert({
        schedule_id: schedule.id,
        home_id: team.id,
        guest_id: null, // Set an appropriate guest team ID
    }).into('matches').returning('id');

    // Insert Player Quarter Statistics
    const quarterIds = [];
    for (let i = 1; i <= 4; i++) {
        const [quarter] = await get().insert({
            match_id: match1.id,
            quarter_number: i,
            started_at: new Date(),
            ended_at: new Date(),
        }).into('quarters').returning('id');
        quarterIds.push(quarter.id);
    }

    const playerStats = [
        { playerId: playerIds[0], minutes: 32, twoFgm: 8, twoFga: 12, threeFgm: 5, threeFga: 11 },
        { playerId: playerIds[1], minutes: 28, twoFgm: 4, twoFga: 8, threeFgm: 4, threeFga: 9 },
    ];

    for (const stat of playerStats) {
        for (const quarterId of quarterIds) {
            await get().insert({
                player_id: stat.playerId,
                quarter_id: quarterId,
                minutes: Math.floor(stat.minutes / 4),
                two_fgm: Math.floor(stat.twoFgm / 4),
                two_fga: Math.floor(stat.twoFga / 4),
                three_fgm: Math.floor(stat.threeFgm / 4),
                three_fga: Math.floor(stat.threeFga / 4),
                freethrow_fgm: 0,
                freethrow_fga: 0,
                offensive_rebounds: 0,
                defensive_rebounds: 0,
                assists: 0,
                steals: 0,
                blocks: 0,
                turnovers: 0,
                fouls: 0,
            }).into('player_quarter_statistics');
        }
    }

    console.table(await get().select("*").from("player_quarter_statistics"));
})();
