import inquirer from 'inquirer'
import chalk from 'chalk'

const prompt = async hasDefaultFlag => {
	const questions = [
		{
			type: 'input',
			name: 'title',
			message: `${chalk.bold.yellow('??')} Project title: `
		},
		{
			type: 'input',
			name: 'description',
			message: `${chalk.bold.yellow('??')} Project description: `
		}
	]

	const mods = ['styled-component', 'context-store', 'react-router-dom']

	if (hasDefaultFlag) {
		const answers = await inquirer.prompt(questions)

		answers.modifications = mods
		return answers
	}

	const modQuestion = {
		type: 'checkbox',
		name: 'modifications',
		message: `

			${chalk.black.bgWhiteBright.bold('--- What MODS to include? ---')}

		`,
		choices: mods
	}

	questions.push(modQuestion)
	return await inquirer.prompt(questions)
}

export default prompt
