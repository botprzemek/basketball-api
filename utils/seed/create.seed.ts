import cockroachStorage from 'services/storage/cockroach.storage'

export default async (): Promise<boolean> => {
	try {
		const sql: any = cockroachStorage()
		await sql`
			CREATE DATABASE IF NOT EXISTS api;
			
			SET DATABASE = api;
			
			CREATE TYPE IF NOT EXISTS position_enum AS ENUM ('PG', 'SG', 'SF', 'PF', 'C');
			CREATE TYPE IF NOT EXISTS role_enum AS ENUM ('COACH', 'TRAINER', 'MANAGER');
			
			CREATE TABLE IF NOT EXISTS city (
				id INT8 NOT NULL PRIMARY KEY UNIQUE DEFAULT unique_rowid(),
				name VARCHAR NOT NULL UNIQUE,
				state VARCHAR NOT NULL,
				INDEX name_idx (name)
			);
			
			CREATE TABLE IF NOT EXISTS arena (
				id INT8 NOT NULL PRIMARY KEY UNIQUE DEFAULT unique_rowid(),
				city_id INT8 NOT NULL REFERENCES city (id) ON DELETE CASCADE,
				name VARCHAR NOT NULL,
				location VARCHAR NOT NULL,
				INDEX name_idx (name),
				INDEX city_id_idx (city_id),
				UNIQUE (name, location)
			);
			
			CREATE TABLE IF NOT EXISTS league (
				id INT8 NOT NULL PRIMARY KEY UNIQUE DEFAULT unique_rowid(),
				arena_id INT8 NOT NULL REFERENCES arena (id) ON DELETE CASCADE,
				city_id INT8 NOT NULL REFERENCES city (id) ON DELETE CASCADE,
				name VARCHAR NOT NULL UNIQUE,
				INDEX name_idx (name),
				INDEX arena_id_idx (arena_id),
				INDEX city_id_idx (city_id)
			);
			
			CREATE TABLE IF NOT EXISTS match (
				id INT8 NOT NULL PRIMARY KEY UNIQUE DEFAULT unique_rowid(),
				arena_id INT8 NOT NULL REFERENCES arena (id) ON DELETE CASCADE,
				league_id INT8 NOT NULL REFERENCES league (id) ON DELETE CASCADE,
				timestamp TIMESTAMP NOT NULL UNIQUE,
				INDEX timestamp_idx (timestamp),
				INDEX arena_id_idx (arena_id),
				INDEX league_id_idx (league_id)
			);
			
			CREATE TABLE IF NOT EXISTS team (
				id INT8 NOT NULL PRIMARY KEY DEFAULT unique_rowid(),
				city_id INT8 NOT NULL REFERENCES city (id) ON DELETE CASCADE,
				league_id INT8 NOT NULL REFERENCES league (id) ON DELETE CASCADE,
				name VARCHAR NOT NULL UNIQUE,
				won INT8 NOT NULL DEFAULT 0,
				lost INT8 NOT NULL DEFAULT 0,
				INDEX name_idx (name),
				INDEX city_id_idx (city_id),
				INDEX league_id_idx (league_id)
			);
			
			CREATE TABLE IF NOT EXISTS staff (
				id INT8 NOT NULL PRIMARY KEY UNIQUE DEFAULT unique_rowid(),
				name VARCHAR NOT NULL,
				lastname VARCHAR NOT NULL,
				role role_enum NOT NULL,
				INDEX name_idx (name),
				INDEX role_idx (role)
			);
			
			CREATE TABLE IF NOT EXISTS team_staff (
				staff_id INT8 NOT NULL REFERENCES staff (id) ON DELETE CASCADE,
				team_id INT8 NOT NULL REFERENCES team (id) ON DELETE CASCADE,
				INDEX staff_id_idx (staff_id),
				INDEX team_id_idx (team_id)
			);
			
			CREATE TABLE IF NOT EXISTS team_statistics (
				id INT8 NOT NULL PRIMARY KEY UNIQUE DEFAULT unique_rowid(),
				match_id INT8 NOT NULL UNIQUE REFERENCES match (id) ON DELETE CASCADE,
				team_id INT8 NOT NULL REFERENCES team (id) ON DELETE CASCADE,
				assists INT8 DEFAULT 0,
				rebounds_off INT8 DEFAULT 0,
				rebounds_def INT8 DEFAULT 0,
				inside_fgm INT8 DEFAULT 0,
				inside_fga INT8 DEFAULT 0,
				outside_fgm INT8 DEFAULT 0,
				outside_fga INT8 DEFAULT 0,
				freethrows_fgm INT8 DEFAULT 0,
				freethrows_fga INT8 DEFAULT 0,
				blocks INT8 DEFAULT 0,
				steals INT8 DEFAULT 0,
				turnovers INT8 DEFAULT 0,
				fouls INT8 DEFAULT 0,
				INDEX match_id_idx (match_id),
				INDEX team_id_idx (team_id)
			);
			
			CREATE TABLE IF NOT EXISTS quarter_statistics (
				id INT8 NOT NULL PRIMARY KEY UNIQUE DEFAULT unique_rowid(),
				match_id INT8 NOT NULL REFERENCES match (id) ON DELETE CASCADE,
				team_id INT8 NOT NULL REFERENCES team (id) ON DELETE CASCADE,
				quarter INT8 DEFAULT 0,
				assists INT8 DEFAULT 0,
				rebounds_off INT8 DEFAULT 0,
				rebounds_def INT8 DEFAULT 0,
				inside_fgm INT8 DEFAULT 0,
				inside_fga INT8 DEFAULT 0,
				outside_fgm INT8 DEFAULT 0,
				outside_fga INT8 DEFAULT 0,
				freethrows_fgm INT8 DEFAULT 0,
				freethrows_fga INT8 DEFAULT 0,
				blocks INT8 DEFAULT 0,
				steals INT8 DEFAULT 0,
				turnovers INT8 DEFAULT 0,
				fouls INT8 DEFAULT 0,
				INDEX match_id_idx (match_id),
				INDEX team_id_idx (team_id)
			);
			
			CREATE TABLE IF NOT EXISTS roster (
				id INT8 NOT NULL PRIMARY KEY UNIQUE DEFAULT unique_rowid(),
				match_id INT8 NOT NULL REFERENCES match (id) ON DELETE CASCADE,
				team_id INT8 NOT NULL REFERENCES team (id) ON DELETE CASCADE,
				INDEX match_id_idx (match_id),
				INDEX team_id_idx (team_id)
			);
			
			CREATE TABLE IF NOT EXISTS player (
				id INT8 NOT NULL PRIMARY KEY UNIQUE DEFAULT unique_rowid(),
				team_id INT8 NOT NULL REFERENCES team (id) ON DELETE CASCADE,
				name VARCHAR NOT NULL,
				lastname VARCHAR NOT NULL,
				number INT8 NOT NULL UNIQUE,
				height INT8 NOT NULL,
				position position_enum NOT NULL,
				birthday DATE NOT NULL,
				starter BOOLEAN DEFAULT false,
				INDEX name_idx (name),
				INDEX lastname_idx (lastname),
				INDEX team_id_idx (team_id),
				UNIQUE (team_id, number)
			);
			
			CREATE TABLE IF NOT EXISTS player_roster (
				player_id INT8 NOT NULL REFERENCES player (id) ON DELETE CASCADE,
				roster_id INT8 NOT NULL REFERENCES roster (id) ON DELETE CASCADE,
				INDEX player_id_idx (player_id),
				INDEX roster_id_idx (roster_id)
			);
			
			CREATE TABLE IF NOT EXISTS player_statistics (
				id INT8 NOT NULL PRIMARY KEY UNIQUE DEFAULT unique_rowid(),
				match_id INT8 NOT NULL REFERENCES match (id) ON DELETE CASCADE,
				player_id INT8 NOT NULL REFERENCES player (id) ON DELETE CASCADE,
				minutes INT8 DEFAULT 0,
				assists INT8 DEFAULT 0,
				rebounds_off INT8 DEFAULT 0,
				rebounds_def INT8 DEFAULT 0,
				inside_fgm INT8 DEFAULT 0,
				inside_fga INT8 DEFAULT 0,
				outside_fgm INT8 DEFAULT 0,
				outside_fga INT8 DEFAULT 0,
				freethrows_fgm INT8 DEFAULT 0,
				freethrows_fga INT8 DEFAULT 0,
				blocks INT8 DEFAULT 0,
				steals INT8 DEFAULT 0,
				turnovers INT8 DEFAULT 0,
				fouls INT8 DEFAULT 0,
				INDEX match_id_idx (match_id),
				INDEX player_id_idx (player_id),
				UNIQUE (match_id, player_id)
			);
			
			CREATE TABLE IF NOT EXISTS backlog (
				id INT8 NOT NULL PRIMARY KEY UNIQUE DEFAULT unique_rowid(),
				match_id INT8 NOT NULL REFERENCES match (id) ON DELETE CASCADE,
				data VARCHAR NOT NULL,
				timestamp DATE NOT NULL DEFAULT current_timestamp,
				INDEX match_id_idx (match_id)
			);
			
			CREATE VIEW player_statistics_average AS SELECT player_statistics.player_id,
				count(player_statistics.player_id)    AS games_played,
				player.team_id                        AS team_id,
				sum(player_statistics.minutes)        AS minutes,
				sum(player_statistics.assists)        AS assists,
				sum(player_statistics.rebounds_off)   AS rebounds_off,
				sum(player_statistics.rebounds_def)   AS rebounds_def,
				sum(player_statistics.inside_fgm)     AS inside_fgm,
				sum(player_statistics.inside_fga)     AS inside_fga,
				sum(player_statistics.outside_fgm)    AS outside_fgm,
				sum(player_statistics.outside_fga)    AS outside_fga,
				sum(player_statistics.freethrows_fgm) AS freethrows_fgm,
				sum(player_statistics.freethrows_fga) AS freethrows_fga,
				sum(player_statistics.blocks)         AS blocks,
				sum(player_statistics.steals)         AS steals,
				sum(player_statistics.turnovers)      AS turnovers,
				sum(player_statistics.fouls)          AS fouls
			FROM player, player_statistics
			WHERE player.id = player_statistics.player_id
			GROUP BY player.team_id, player_statistics.player_id`.simple()
		return true
	} catch (error) {
		console.log(error)
		return false
	}
}
