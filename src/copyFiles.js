import fs from 'fs'
import path from 'path'
import ncp from 'ncp'
import { promisify } from 'util'

const access = promisify(fs.access)
const copy = promisify(ncp)

function copyModTemplates(modifications, currentWorkingDir) {
	// base file is 'common'
	const mods = ['common', ...modifications]

	// 	issue with concurrent: error with overwriting files
	//  use non-concurrent in copying templates instead
	return mods.reduce(async (promise, modName) => {
		await promise

		const modTemplate = path.resolve(__dirname, '../template', modName)

		return copy(modTemplate, currentWorkingDir, {
			// clobber === overwrite files
			clobber: true
		})
	}, Promise.resolve())
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
	} catch (error) {
		console.error('Cant access the template directory!')
		process.exit(1)
	}

	try {
		await copyModTemplates(answers.modifications, currentWorkingDir)

		return
	} catch (error) {
		console.error('Error in copying templates', error)
		process.exit(1)
	}
}

export default copyFiles
