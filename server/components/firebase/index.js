const System = require('systemic');

const initFireBase = require('./initFirebase');

module.exports = new System({ name: 'firebase' })
	.add('firebase', initFireBase())
	.dependsOn('config', 'logger');
