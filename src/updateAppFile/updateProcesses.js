// process sequence is important

const updateProcesses = [
	{
		mod: 'styled-component',
		processes: [
			{
				name: 'import GlobalStyle',
				regex: /const GlobalStyle = 'should import'/g,
				replacement:
					"import GlobalStyle from './styled-component/GlobalStyle'",
				negativeReplacement: ''
			},
			{
				name: 'attach <GlobalStyle />',
				regex: /<p>GlobalStyle<\/p>/g,
				replacement: '<GlobalStyle />',
				negativeReplacement: ''
			}
		]
	},
	{
		mod: 'context-store',
		processes: [
			{
				name: 'import StoreProvider',
				regex: /const StoreProvider = 'should import'/g,
				replacement:
					"import {StoreProvider} from './store/StoreContext'",
				negativeReplacement: ''
			},
			{
				name: 'attach <StoreProvider />',
				regex: /<main>React App!<\/main>/g,
				replacement: `<StoreProvider>
			<main>React App!<\/main>
		<StoreProvider/>
				`,
				negativeReplacement: '<main>React App!</main>'
			}
		]
	},
	{
		mod: 'react-router-dom',
		processes: [
			{
				name: 'import Routes',
				regex: /const Routes = 'should import'/g,
				replacement: "import Routes from './Routes'",
				negativeReplacement: ''
			},
			{
				name: 'attach <Routes />',
				regex: /<main>React App!<\/main>/g,
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

export default updateProcesses
