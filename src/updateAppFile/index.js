import { promisify } from 'util'
import replace from 'replace-in-file'
import updateProcesses from './updateProcesses'

const asyncReplace = promisify(replace)

async function updateAppFile(modifications) {
	const hasEmptyMods = modifications.length === 0

	if (hasEmptyMods) {
		return
	}

	const appFilePath = './src/App.js'

	// non-concurrent - one file at a time
	return updateProcesses.reduce(async (promise, modProcess) => {
		await promise

		const hasMod = modifications.includes(modProcess.mod)

		return modProcess.processes.reduce(async (processPromise, process) => {
			await processPromise

			return asyncReplace({
				files: appFilePath,
				from: process.regex,
				to: hasMod ? process.replacement : process.negativeReplacement
			})
		}, Promise.resolve())
	}, Promise.resolve())
}

export default updateAppFile
