const System = require('systemic');

const adminRoutes = require('./admin-routes');
const firebaseRoutes = require('./firebase-routes');

module.exports = new System({ name: 'routes' })
	.add('routes.admin', adminRoutes())
	.dependsOn('config', 'app', 'manifest')
	.add('routes.firebase', firebaseRoutes())
	.dependsOn('app')
	.add('routes')
	.dependsOn('routes.admin')
	.dependsOn('routes.firebase');
