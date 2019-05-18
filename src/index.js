import { Command, flags } from '@oclif/command'
import chalk from 'chalk'
import start from './start'

class CLI extends Command {
	async run() {
		const { flags } = this.parse(CLI)
		const hasDefaultFlag = flags.default

		// ESM export works with this file
		await start(hasDefaultFlag)

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

// - it seems "export default CLI" does not work here (just this file)
//   even if using the ESM
// - import above works though
// - other files have no issue
module.exports = CLI
