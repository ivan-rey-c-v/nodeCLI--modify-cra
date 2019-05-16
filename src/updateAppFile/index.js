import { promisify } from 'util'
import replace from 'replace-in-file'
import updateProcesses from './updateProcesses'

const asyncReplace = promisify(replace)

async function updateAppFile(modifications, currentWorkingDir) {
	const hasEmptyMods = modifications.length === 0

	if (hasEmptyMods) {
		return
	}

	// non-concurrent - one file at a time
	await updateProcesses.reduce(async (promise, modProcess) => {
		await promise

		const hasMod = modifications.includes(modProcess.mod)
		// console.log(modProcess.mod, { hasMod })

		return modProcess.processes.reduce(async (processPromise, process) => {
			await processPromise

			return asyncReplace({
				files: './src/App.js',
				from: process.regex,
				to: hasMod ? process.replacement : process.negativeReplacement
			})
		}, Promise.resolve())
	}, Promise.resolve())

	// remove all empty lines
	asyncReplace({
		files: './src/App.js',
		from: /^\s*[\r\n]/gm,
		to: ''
	})
}

export default updateAppFile
