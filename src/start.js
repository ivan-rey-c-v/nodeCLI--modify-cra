import Listr from 'listr'
import chalk from 'chalk'

import promptQuestions from './promptQuestions'
import copyFiles from './copyFiles'
import removeUnnecessaryFiles from './removeUnnecessaryFiles'
import updateAppFile from './updateAppFile'
import prettifyAppFile from './prettifyAppFile'
import installDependencies from './installDependencies'

async function start(hasDefaultFlag) {
	const answers = await promptQuestions(hasDefaultFlag)

	const tasks = new Listr(
		[
			{
				title: 'Removing unnecessary files.',
				task: () => removeUnnecessaryFiles()
			},
			{
				title: 'Update files + install deps.',
				task: () => {
					return new Listr(
						[
							{
								title: 'Copying files from CLI template.',
								task: () => copyFiles(answers)
							},
							{
								title: 'Update the App.js file.',
								task: () => updateAppFile(answers.modifications)
							},
							{
								title: 'Format the App.js file',
								task: () => prettifyAppFile()
							},
							{
								title: 'Add necessary dependencies',
								task: () =>
									installDependencies(answers.modifications)
							}
						],
						{
							concurrent: false
						}
					)
				}
			}
		],
		{
			concurrent: true
		}
	)

	console.log(`${chalk.yellow.inverse('Starting to modify this react app')}`)

	tasks.run().catch(err => {
		console.error(err)
	})
}

export default start
