import fs from 'fs'
import path from 'path'
import { promisify } from 'util'

const removeFile = promisify(fs.unlink)

const removeUnnecessaryFiles = async () => {
	// since this will be used as CLI,
	//		CWD === current directory of terminal
	const currentWorkingDir = process.cwd()

	const unnecessaryFilePaths = [
		'./src/App.css',
		'./src/App.test.js',
		'./src/index.css',
		'./src/logo.svg'
	]

	const deletionPromises = unnecessaryFilePaths.map(async filePath => {
		const fileDir = path.resolve(currentWorkingDir, filePath)

		try {
			await removeFile(fileDir)
		} catch (error) {
			// console.log('file not found ', filePath)
		}
		return fileDir
	})

	return Promise.all(deletionPromises)
}

export default removeUnnecessaryFiles
