export default {
	arenas: {
		city_id: /^\d{18}$/,
		name: /^.{3,32}$/,
		location:
			/^([-+]?\d{1,2})°\s*(\d{1,2})'\s*([\d.]+)"\s*([NS])\s*([-+]?\d{1,3})°\s*(\d{1,2})'\s*([\d.]+)"\s*([EW])$/
	}
}
