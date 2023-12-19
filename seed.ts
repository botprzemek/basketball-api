import drop from 'utils/seed/drop.seed'
import create from 'utils/seed/create.seed'
import fill from 'utils/seed/fill.seed'

const seed = async (): Promise<void> => {
	const start: number = performance.now()
	let status: boolean = await drop()

	if (!status) process.exit(0)

	status = await create()

	if (!status) process.exit(0)

	status = await fill()

	if (!status) process.exit(0)

	console.log(
		`${new Date().toLocaleTimeString('pl-PL')} [seed] seeding finished successfully (${(
			(performance.now() - start) /
			1000
		).toFixed(2)}s)`
	)

	process.exit(0)
}

void seed()
