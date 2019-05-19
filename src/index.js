import { Command, flags } from '@oclif/command'
import chalk from 'chalk'
import start from './start'

import commitChanges from './commitChanges'

class CLI extends Command {
	async run() {
		const { flags } = this.parse(CLI)
		const hasDefaultFlag = flags.default

		try {
			await start(hasDefaultFlag)
		} catch (error) {
			console.error(error)
		}

		// separate this from tasks in start.js
		// just commit when all are working and no Errors
		await commitChanges()

		this.log(`
			${chalk.green('Done ✓ - Start Coding!')}
		`)
	}
}

CLI.description = `Describe the command here

	${chalk.green('Modify create react apps.')}
`

CLI.flags = {
	// add --version flag to show CLI version
	version: flags.version({ char: 'v' }),
	// add --help flag to show CLI version
	help: flags.help({ char: 'h' }),
	default: flags.boolean({
		char: 'd',
		description: 'Include all modifications',
		default: false
	})
}

export default CLI
