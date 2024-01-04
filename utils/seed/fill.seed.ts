import cockroachStorage from 'services/storage/cockroach.storage'

export default async (): Promise<boolean> => {
	try {
		const sql: any = cockroachStorage()
		await sql`
			CREATE DATABASE IF NOT EXISTS api;
			
			SET DATABASE = api;
			
			INSERT INTO city (name, state) VALUES
				('Bytom', 'Silesia'),
				('Chorzów', 'Silesia'),
				('Czeladź', 'Silesia'),
				('Katowice', 'Silesia'),
				('Knurów', 'Silesia'),
				('Siemianowice', 'Silesia')
			ON CONFLICT (name) DO NOTHING;
			
			INSERT INTO arena (city_id, name, location) VALUES
				((SELECT id FROM city WHERE name = 'Knurów'), 'MOSiR', '50°14''00.3"N 18°39''13.8"E'),
				((SELECT id FROM city WHERE name = 'Katowice'), 'Spodek', '50°16''00.4"N 19°01''35.2"E')
			ON CONFLICT (location, name) DO NOTHING;
			
			INSERT INTO league (arena_id, city_id, name) VALUES
				((SELECT id FROM arena WHERE name = 'Spodek'), (SELECT id FROM city WHERE name = 'Katowice'), 'Śląska Liga Koszykówki'),
				((SELECT id FROM arena WHERE name = 'MOSiR'), (SELECT id FROM city WHERE name = 'Knurów'), 'Sparing')
			ON CONFLICT (name) DO NOTHING;
			
			INSERT INTO match (league_id, arena_id, timestamp) VALUES
				(
					(SELECT id FROM league WHERE name = 'Śląska Liga Koszykówki'),
					(SELECT id FROM arena WHERE name = 'Spodek'),
					'2023-10-22 10:15:00'
				),
				(
					(SELECT id FROM league WHERE name = 'Śląska Liga Koszykówki'),
					(SELECT id FROM arena WHERE name = 'Spodek'),
					'2023-11-19 9:00:00'
				);
			
			INSERT INTO team (city_id, league_id, name, won, lost) VALUES
				(
					(SELECT id FROM city WHERE name = 'Siemianowice'),
					(SELECT id FROM league WHERE name = 'Śląska Liga Koszykówki'),
					'77 Basket Academy', 0, 2),
				(
					(SELECT id FROM city WHERE name = 'Chorzów'),
					(SELECT id FROM league WHERE name = 'Śląska Liga Koszykówki'),
					'Batory Warriors', 3, 0),
				(
					(SELECT id FROM city WHERE name = 'Chorzów'),
					(SELECT id FROM league WHERE name = 'Śląska Liga Koszykówki'),
					'Coals', 0, 2),
				(
					(SELECT id FROM city WHERE name = 'Czeladź'),
					(SELECT id FROM league WHERE name = 'Śląska Liga Koszykówki'),
					'Czelsi Bulls', 1, 2),
				(
					(SELECT id FROM city WHERE name = 'Katowice'),
					(SELECT id FROM league WHERE name = 'Śląska Liga Koszykówki'),
					'Dziki z Ligoty', 2, 0),
				(
					(SELECT id FROM city WHERE name = 'Bytom'),
					(SELECT id FROM league WHERE name = 'Śląska Liga Koszykówki'),
					'INo Defence', 1, 1),
				(
					(SELECT id FROM city WHERE name = 'Knurów'),
					(SELECT id FROM league WHERE name = 'Śląska Liga Koszykówki'),
					'Knury Knurów I', 1, 1),
				(
					(SELECT id FROM city WHERE name = 'Knurów'),
					(SELECT id FROM league WHERE name = 'Sparing'),
					'Knury Knurów II', 0, 0),
				(
					(SELECT id FROM city WHERE name = 'Bytom'),
					(SELECT id FROM league WHERE name = 'Śląska Liga Koszykówki'),
					'KRB Squad', 1, 2),
				(
					(SELECT id FROM city WHERE name = 'Katowice'),
					(SELECT id FROM league WHERE name = 'Śląska Liga Koszykówki'),
					'Paderewa', 3, 0),
				(
					(SELECT id FROM city WHERE name = 'Siemianowice'),
					(SELECT id FROM league WHERE name = 'Śląska Liga Koszykówki'),
					'PIK Siemianowice', 0, 1)
			ON CONFLICT (name) DO NOTHING;
			
			INSERT INTO staff (first_name, last_name, role) VALUES
				('Kacper', 'Kopeć', 'TRAINER');
			
			INSERT INTO team_staff (staff_id, team_id) VALUES
				((SELECT id FROM staff WHERE first_name = 'Kacper' AND last_name = 'Kopeć'), (SELECT id FROM team WHERE name = 'Knury Knurów I')),
				((SELECT id FROM staff WHERE first_name = 'Kacper' AND last_name = 'Kopeć'), (SELECT id FROM team WHERE name = 'Knury Knurów II'));
			
			INSERT INTO roster (team_id, match_id) VALUES
				(
					(SELECT id FROM team WHERE name = 'Knury Knurów I'),
					(SELECT id FROM match WHERE timestamp = '2023-10-22 10:15:00')
				),
				(
					(SELECT id FROM team WHERE name = 'Batory Warriors'),
					(SELECT id FROM match WHERE timestamp = '2023-10-22 10:15:00')
				),
				(
					(SELECT id FROM team WHERE name = 'Knury Knurów I'),
					(SELECT id FROM match WHERE timestamp = '2023-11-19 9:00:00')
				),
				(
					(SELECT id FROM team WHERE name = 'PIK Siemianowice'),
					(SELECT id FROM match WHERE timestamp = '2023-11-19 9:00:00')
				);
			
			INSERT INTO player (team_id, first_name, last_name, number, height, position, birthday, starter) VALUES
				((SELECT id FROM team WHERE name = 'Knury Knurów I'), 'Dawid', 'Kocięba', 0, 190, 'PF', '2001-12-06', false),
				((SELECT id FROM team WHERE name = 'Knury Knurów I'), 'Dominik', 'Girgiel', 34, 185, 'SF', '2007-06-14', false),
				((SELECT id FROM team WHERE name = 'Knury Knurów I'), 'Filip', 'Kułach', 22, 190, 'SF', '2001-07-13', false),
				((SELECT id FROM team WHERE name = 'Knury Knurów I'), 'Franek', 'Borkowski', 43, 190, 'C', '2007-08-02', false),
				((SELECT id FROM team WHERE name = 'Knury Knurów I'), 'Grzegorz', 'Odrzywałek', 44, 185, 'SG', '1981-07-25', false),
				((SELECT id FROM team WHERE name = 'Knury Knurów I'), 'Igor', 'Szkodny', 70, 192, 'C', '2003-07-07', true),
				((SELECT id FROM team WHERE name = 'Knury Knurów I'), 'Kajetan', 'Kozłowski', 7, 185, 'SG', '2007-04-14', false),
				((SELECT id FROM team WHERE name = 'Knury Knurów I'), 'Karol', 'Karpiński', 5, 185, 'SG', '2007-11-07', false),
				((SELECT id FROM team WHERE name = 'Knury Knurów I'), 'Kornel', 'Suchocki', 1, 187, 'PG', '2007-10-09', true),
				((SELECT id FROM team WHERE name = 'Knury Knurów I'), 'Krzysztof', 'Żuber', 18, 200, 'PF', '2008-06-23', true),
				((SELECT id FROM team WHERE name = 'Knury Knurów I'), 'Maciek', 'Wieczorke', 55, 201, 'C', '2006-01-01', false),
				((SELECT id FROM team WHERE name = 'Knury Knurów I'), 'Maksymilian', 'Elizarov', 98, 187, 'SG', '2006-01-01', false),
				((SELECT id FROM team WHERE name = 'Knury Knurów I'), 'Przemysław', 'Szymański', 13, 185, 'SF', '2003-12-26', true),
				((SELECT id FROM team WHERE name = 'Knury Knurów I'), 'Tomasz', 'Gontarewicz', 4, 180, 'SG', '2002-10-03', true),
				((SELECT id FROM team WHERE name = 'Knury Knurów II'), 'Aleksander', 'Szafarz', 91, 183, 'SF', '2009-06-22', false),
				((SELECT id FROM team WHERE name = 'Knury Knurów II'), 'Dominik', 'Karaś', 25, 179, 'PG', '2008-11-26', false),
				((SELECT id FROM team WHERE name = 'Knury Knurów II'), 'Dominik', 'Gogolin', 76, 185, 'PF', '2006-01-07', false),
				((SELECT id FROM team WHERE name = 'Knury Knurów II'), 'Igor', 'Orlef', 24, 185, 'PF', '2005-02-23', true),
				((SELECT id FROM team WHERE name = 'Knury Knurów II'), 'Karol', 'Gramala', 96, 179, 'SG', '2007-01-01', false),
				((SELECT id FROM team WHERE name = 'Knury Knurów II'), 'Ksawery', 'Matuszek', 93, 185, 'SG', '2007-01-01', false),
				((SELECT id FROM team WHERE name = 'Knury Knurów II'), 'Kuba', 'Zieliński', 36, 183, 'SF', '2006-08-26', false),
				((SELECT id FROM team WHERE name = 'Knury Knurów II'), 'Maksymilian', 'Lipka', 33, 179, 'SG', '2009-10-04', false),
				((SELECT id FROM team WHERE name = 'Knury Knurów II'), 'Mateusz', 'Nizar', 20, 185, 'PF', '2003-07-23', true),
				((SELECT id FROM team WHERE name = 'Knury Knurów II'), 'Mateusz', 'Augustyn', 17, 200, 'C', '2005-09-18', true),
				((SELECT id FROM team WHERE name = 'Knury Knurów II'), 'Mateusz', 'Buń', 99, 183, 'SF', '2007-01-01', false),
				((SELECT id FROM team WHERE name = 'Knury Knurów II'), 'Michał', 'Pilc', 23, 179, 'PG', '2008-05-23', true),
				((SELECT id FROM team WHERE name = 'Knury Knurów II'), 'Patryk', 'Kubacki', 27, 190, 'PF', '2007-02-01', false),
				((SELECT id FROM team WHERE name = 'Knury Knurów II'), 'Piotr', 'Oleksy', 97, 179, 'PG', '2009-01-13', false),
				((SELECT id FROM team WHERE name = 'Knury Knurów II'), 'Samuel', 'Ntuk', 94, 186, 'SF', '2008-01-01', false),
				((SELECT id FROM team WHERE name = 'Knury Knurów II'), 'Tomasz', 'Dubiel', 32, 180, 'SG', '2008-05-06', true);`.simple()
		return true
	} catch (error) {
		console.log(error)
		return false
	}
}
