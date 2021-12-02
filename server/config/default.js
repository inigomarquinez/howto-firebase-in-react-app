module.exports = {
	server: {
		host: '0.0.0.0',
		port: 4000,
	},
	routes: {
		admin: {
			swaggerValidator: {
				apiDocEndpoint: '/__/docs/api',
				validateRequests: true,
				validateResponses: true,
				validationEndpoint: '/test',
				format: 'yaml',
				yaml: {
					file: './docs/syncapi.yaml',
				},
			},
		},
	},
	firebase: {
		type: process.env.FIREBASE_APP_TYPE,
		project_id: process.env.FIREBASE_APP_PROJECT_ID,
		private_key_id: process.env.FIREBASE_APP_PRIVATE_KEY_ID,
		private_key: process.env.FIREBASE_APP_PRIVATE_KEY,
		client_email: process.env.FIREBASE_APP_CLIENT_EMAIL,
		client_id: process.env.FIREBASE_APP_CLIENT_ID,
		auth_uri: process.env.FIREBASE_APP_AUTH_URI,
		token_uri: process.env.FIREBASE_APP_TOKEN_URI,
		auth_provider_x509_cert_url: process.env.FIREBASE_APP_AUTH_PROVIDER_X509_CERT_URL,
		client_x509_cert_url: process.env.FIREBASE_APP_CLIENT_X509_CERT_URL,
	},
	logger: {
		transport: 'console',
		include: [
			'tracer',
			'timestamp',
			'level',
			'message',
			'error.message',
			'error.code',
			'error.stack',
			'request.url',
			'request.headers',
			'request.params',
			'request.method',
			'response.statusCode',
			'response.headers',
			'response.time',
			'process',
			'system',
			'package.name',
			'service',
		],
		exclude: ['password', 'secret', 'token', 'request.headers.cookie', 'dependencies', 'devDependencies'],
	},
};
