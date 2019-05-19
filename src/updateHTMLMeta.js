import { promisify } from 'util'
import replace from 'replace-in-file'

const asyncReplace = promisify(replace)

function updateMeta(answers) {
	const { title, description } = answers

	const htmlFilePath = './public/index.html'

	// you may change or add this as questions prompt for users
	const author = 'ivan.rey.c.v@gmail.com'

	const replacements = [
		{
			name: 'author',
			from: '${author}',
			to: author
		},
		{
			name: 'project title',
			from: '${title}',
			to: title
		},
		{
			name: 'project description',
			from: '${description}',
			to: description
		}
	]

	return replacements.reduce(async (promise, replacement) => {
		await promise

		return asyncReplace({
			files: htmlFilePath,
			from: replacement.from,
			to: replacement.to
		})
	}, Promise.resolve())
}

export default updateMeta
