import fs from 'fs'
import path from 'path'
import ncp from 'ncp'
import { promisify } from 'util'
//import updateAppFile from './updateAppFile'

const access = promisify(fs.access)
const copy = promisify(ncp)

function copyModTemplates(modifications, currentWorkingDir) {
	// base file is 'common'
	const mods = ['common', ...modifications]

	// concurrent copying templates
	const copyingPromises = mods.map(async modName => {
		const modTemplate = path.resolve(__dirname, '../template', modName)

		return copy(modTemplate, currentWorkingDir, {
			// clobber === overwrite files
			clobber: true
		})
	})

	return Promise.all(copyingPromises)
}

const copyFiles = async answers => {
	// since this will be used as CLI,
	//		CWD === current directory of terminal
	const currentWorkingDir = process.cwd()

	// __dirname === where this file(copyFile.js) is located: (:root/src)
	const templateDir = path.resolve(__dirname, '../template')

	try {
		// check if template is available
		await access(templateDir, fs.constants.R_OK)

		return await copyModTemplates(answers.modifications, currentWorkingDir)
		//return updateAppFile(answers.modifications, currentWorkingDir)
	} catch (error) {
		console.error(error)
		process.exit(1)
	}
}

export default copyFiles
