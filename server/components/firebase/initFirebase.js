const debug = require('debug')('firebase');
const firebaseAdmin = require('firebase-admin');

module.exports = () => {
	const start = async ({ config, logger }) => {
		try {
			await firebaseAdmin.initializeApp({
				credential: firebaseAdmin.credential.cert({
					private_key: config.privateKey.replace(/\\n/gm, '\n'), // Use replace method to add line breaks on private key. Else it will fail.
					...config.serviceAccount,
				}),
				databaseURL: config.databaseURL,
			});
		} catch (e) {
			logger.error(`Error initializing Firebase: ${e.message}`);
			debug('Error initializing Firebase');
		}

		const sendMessage = async (recipients, notification) => {
			logger.info(`Sending message to recipients: ${recipients}`);
			debug(`Sending message to recipients: ${recipients}`);
			try {
				const response = await firebaseAdmin.messaging().sendMulticast({
					tokens: recipients,
					data: JSON.parse(JSON.stringify(notification)),
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
