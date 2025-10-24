module.exports = {
	extends: ['@commitlint/config-conventional'],
	rules: {
		'type-enum': [
			2,
			'always',
			['hotfix', 'build', 'chore', 'ci', 'docs', 'feat', 'fix', 'merge', 'perf', 'refactor', 'revert', 'style', 'test'],
		],
	},
};
