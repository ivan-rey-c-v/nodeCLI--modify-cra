import { Command, flags } from '@oclif/command'
import test from './test'

// ESM works with this file
test()

class CLI extends Command {
	async run() {
		const { flags } = this.parse(CLI)
		const name = flags.name || 'world'
		this.log(`hello ${name} from .\\src\\index.js`)
	}
}

CLI.description = `Describe the command here
...
Extra documentation goes here
`

CLI.flags = {
	// add --version flag to show CLI version
	version: flags.version({ char: 'v' }),
	// add --help flag to show CLI version
	help: flags.help({ char: 'h' }),
	name: flags.string({ char: 'n', description: 'name to print' })
}

// - it seems "export default CLI" does not work here (just this file)
//   even if using the ESM
// - import above works though
// - other files have no issue
module.exports = CLI
