import Listr from 'listr'
import chalk from 'chalk'

import promptQuestions from './promptQuestions'
import copyFiles from './copyFiles'
import removeUnnecessaryFiles from './removeUnnecessaryFiles'

async function start(hasDefaultFlag) {
	const answers = await promptQuestions(hasDefaultFlag)

	const tasks = new Listr(
		[
			{
				title: 'Removing unnecessary files',
				task: () => removeUnnecessaryFiles()
			},
			{
				title: 'Copying files from CLI template',
				task: () => copyFiles(answers)
			}
		],
		{
			concurrent: true
		}
	)

	console.log(`
			${chalk.yellow.inverse('Starting to modify this react app')}
		`)

	tasks.run().catch(err => {
		console.error(err)
	})
}

export default start
