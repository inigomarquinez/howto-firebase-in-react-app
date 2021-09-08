const System = require('systemic');

const adminRoutes = require('./admin-routes');
const firebaseRoutes = require('./firebase-routes');

module.exports = new System({ name: 'routes' })
	.add('routes.admin', adminRoutes())
	.dependsOn('config', 'app', 'manifest')
	.add('routes.firebase', firebaseRoutes())
	.dependsOn('app', 'store', 'logger')
	.add('routes')
	.dependsOn(
		{
			component: 'routes.admin',
			destination: 'admin',
		},
		{
			component: 'routes.firebase',
			destination: 'firebase',
		},
	);
