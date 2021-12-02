const debug = require('debug')('firebase');
const firebaseAdmin = require('firebase-admin');

module.exports = () => {
	const start = async ({ config, logger }) => {
		try {
			await firebaseAdmin.initializeApp({
				credential: firebaseAdmin.credential.cert({
					type: config.type,
					project_id: config.project_id,
					private_key_id: config.private_key_id,
					private_key: config.private_key.replace(/\\n/gm, '\n'), // Use replace method to add line breaks on private key to avoid 'Error: Invalid PEM formatted message.'
					client_email: config.client_email,
					client_id: config.client_id,
					auth_uri: config.auth_uri,
					token_uri: config.token_uri,
					auth_provider_x509_cert_url: config.auth_provider_x509_cert_url,
					client_x509_cert_url: config.client_x509_cert_url,
				}),
				databaseURL: config.databaseURL,
			});
		} catch (e) {
			logger.error(`Error initializing Firebase: ${e.message}`);
			debug('Error initializing Firebase');
		}

		const sendMessage = async recipients => {
			logger.info(`Sending message to recipients: ${recipients}`);
			debug(`Sending message to recipients: ${recipients}`);
			try {
				const response = await firebaseAdmin.messaging().sendMulticast({
					tokens: [recipients],
					data: {
						title: 'This is a Firebase notification',
						body: 'This is the body of the notification',
					},
				});

				return Promise.resolve(response);
			} catch (e) {
				logger.info(`Error sending message to recipients '${recipients}': ${e.message}`);
				debug(`Error sending message to recipients '${recipients}'`);
				return Promise.reject(e);
			}
		};

		return {
			sendMessage,
		};
	};

	return { start };
};
