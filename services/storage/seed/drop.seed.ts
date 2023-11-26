import cockroachStorage from 'services/storage/cockroach.storage'

export default async (): Promise<boolean> => {
	try {
		const sql: any = cockroachStorage()
		await sql`
			CREATE DATABASE IF NOT EXISTS api;
			
			SET DATABASE = api;
			
			DROP TABLE IF EXISTS backlog;
			DROP TABLE IF EXISTS player_statistics;
			DROP TABLE IF EXISTS player_roster;
			DROP TABLE IF EXISTS player;
			DROP TABLE IF EXISTS roster;
			DROP TABLE IF EXISTS quarter_statistics;
			DROP TABLE IF EXISTS team_statistics;
			DROP TABLE IF EXISTS team_staff;
			DROP TABLE IF EXISTS staff;
			DROP TABLE IF EXISTS team;
			DROP TABLE IF EXISTS match;
			DROP TABLE IF EXISTS league;
			DROP TABLE IF EXISTS arena;
			DROP TABLE IF EXISTS city;
			
			DROP TYPE IF EXISTS position_enum;
			DROP TYPE IF EXISTS role_enum;`.simple()
		return true
	} catch {
		return false
	}
}
