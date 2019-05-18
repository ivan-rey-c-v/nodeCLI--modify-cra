import fs from 'fs'
import path from 'path'
import prettier from 'prettier'
import { promisify } from 'util'
import replace from 'replace-in-file'

const asyncReplace = promisify(replace)
const readFile = promisify(fs.readFile)

async function prettifyAppFile() {
	const APP_FILE_PATH = './src/App.js'
	const filePath = path.resolve(process.cwd(), APP_FILE_PATH)

	try {
		const fileText = await readFile(filePath, 'utf8')

		const options = await prettier.resolveConfig(filePath)

		// prettier encourages to define the parser
		options.parser = 'babel'

		const formattedText = prettier.format(fileText, options)

		return asyncReplace({
			files: APP_FILE_PATH,
			from: fileText,
			to: formattedText
		})
	} catch (error) {
		console.log(error)
	}
}

export default prettifyAppFile
