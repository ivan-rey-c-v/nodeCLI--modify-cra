import promptQuestions from './promptQuestions'

async function start(hasDefaultFlag) {
	const answers = await promptQuestions(hasDefaultFlag)
	console.log({ answers })
}

export default start
