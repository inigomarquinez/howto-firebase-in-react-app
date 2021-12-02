const System = require('systemic');

const userStore = require('./user-store');

module.exports = new System({ name: 'store' })
	.add('store.user', userStore())
	.dependsOn('logger')
	.add('store')
	.dependsOn(
		{
			component: 'store.user',
			destination: 'user',
		},
	);
