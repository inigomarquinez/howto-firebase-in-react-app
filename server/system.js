require('dotenv').config();

const System = require('systemic');
const { join } = require('path');

module.exports = () => new System({ name: 'server' })
	.bootstrap(join(__dirname, 'components'));
