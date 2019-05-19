import execa from 'execa'

async function commit() {
	const commitMsg = 'Modify project: remove/update files, add dependencies'

	await execa('git', ['add', '.'])
	return execa('git', ['commit', '-am', commitMsg])
}

export default commit
