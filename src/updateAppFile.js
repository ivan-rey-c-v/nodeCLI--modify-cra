import path from 'path'
import { promisify } from 'util'
import replace from 'replace-in-file'

const asyncReplace = promisify(replace)

function updateAppFile(modifications, currentWorkingDir) {
	const hasEmptyMods = modifications.length === 0

	if (hasEmptyMods) {
		return
	}

	// process sequence is important
	const updateProcesses = [
		{
			mod: 'styled-component',
			processes: [
				{
					name: 'import GlobalStyle',
					regex: /\/* import GlobalStyle *\//,
					replacement:
						"import GlobalStyle from './styled-component/GlobalStyle'",
					negativeReplacement: ''
				},
				{
					name: 'attach <GlobalStyle />',
					regex: /{\/* GlobalStyle *\/}/,
					replacement:
						"import GlobalStyle from './styled-component/GlobalStyle'",
					negativeReplacement: ''
				}
			]
		},
		{
			mod: 'context-store',
			processes: [
				{
					name: 'import StoreProvider',
					regex: /\/* import StoreProvider *\//,
					replacement:
						"import {StoreProvider} from './store/StoreContext'",
					negativeReplacement: ''
				},
				{
					name: 'attach <StoreProvider />',
					regex: /{\/* main *\/}/,
					replacement: `
					  <StoreProvider>
							{/* main */}
					  <StoreProvider/>
					`,
					negativeReplacement: '{/* main */}'
				}
			]
		},
		{
			mod: 'react-router-dom',
			processes: [
				{
					name: 'import Routes',
					regex: /\/* import Routes *\//,
					replacement: "import Routes from './Routes'",
					negativeReplacement: ''
				},
				{
					name: 'attach <Routes />',
					regex: /{\/* main *\/}/,
					replacement: '<Routes />',
					negativeReplacement: `
						<main>
							<h1>Hello from React!</h1>
						<main/>
					`
				}
			]
		}
	]

	const appFilePath = path.resolve(currentWorkingDir, './src', 'App.js')

	// non-concurrent - one file at a time
	return updateProcesses.reduce(async (promise, modProcess) => {
		await promise

		const hasMod = modifications.includes(modProcess.mod)

		const processesPromise = modProcess.processes.map(async process => {
			return await asyncReplace({
				files: appFilePath,
				from: process.regex,
				to: hasMod
					? process.replacement
					: AudioProcessingEvent.negativeReplacement
			})
		})

		await Promise.all(processesPromise)
		return modProcess.mod
	}, Promise.resolve())
}

export default updateAppFile
