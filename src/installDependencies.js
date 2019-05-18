import execa from 'execa'

function installDependencies(mods) {
	const CONTEXT_STORE = 'context-store'
	const modifications = mods.filter(mod => mod !== CONTEXT_STORE)
	console.log({ modifications })

	// you may add this as part of cli questions
	const pkgManager = 'yarn'
	// you may change action if using npm
	const action = 'add'

	// mods === 'exact name as the dependency required'
	return execa(pkgManager, [action, ...modifications])
}

export default installDependencies
