export default {
	arenas: {
		city_id: /^\d{18}$/,
		name: /^.{3,32}$/,
		location:
			/^([-+]?\d{1,2})°\s*(\d{1,2})'\s*([\d.]+)"\s*([NS])\s*([-+]?\d{1,3})°\s*(\d{1,2})'\s*([\d.]+)"\s*([EW])$/
	},
	cities: {
		name: /^.{3,32}$/,
		state: /^.{3,32}$/
	},
	players: {
		team_id: /^\d{18}$/,
		first_name: /^.{3,32}$/,
		last_name: /^.{3,32}$/,
		number: /^\d{3}$/,
		height: /^\d{4}$/,
		position: /^.{1,2}$/,
		birthday: /^.{6,32}$/,
		starter: /^.{4,5}$/
	},
	teams: {
		city_id: /^\d{18}$/,
		league_id: /^\d{18}$/,
		name: /^.{3,32}$/,
		won: /^\d{0,3}$/,
		lost: /^\d{0,3}$/
	}
}
