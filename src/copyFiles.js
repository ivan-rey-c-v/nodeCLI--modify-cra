import fs from 'fs'
import path from 'path'
import ncp from 'ncp'
import { promisify } from 'util'

const access = promisify(fs.access)
const copy = promisify(ncp)

const copyFiles = async () => {
	// since this will be used as CLI,
	//		CWD === current directory of terminal
	const currentWorkingDir = process.cwd()

	// __dirname === where this file(copyFile.js) is located: (:root/src)
	const templateDir = path.resolve(__dirname, '../template')

	try {
		await access(templateDir, fs.constants.R_OK)

		// copy the template folder to the working directory where this CLI was called
		return copy(templateDir, currentWorkingDir, {
			// clobber === overwrite files
			clobber: true
		})
	} catch (error) {
		console.error(error)
		process.exit(1)
	}
}

export default copyFiles
