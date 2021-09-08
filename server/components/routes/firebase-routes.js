module.exports = () => {
	const start = async ({ app, store, logger }) => {
		app.post('/registerDevice', async (req, res) => {
			try {
				const { body: { deviceId } } = req;
				await store.user.saveUserDevice(deviceId);
				res.sendStatus(200);
			} catch (error) {
				logger.error(error);
				res.sendStatus(500);
			}
		});

		app.post('/sendMessage', (_req, res) => {
			try {
				console.log('sendMessage');
				res.sendStatus(200);
			} catch (error) {
				logger.error(error);
				res.sendStatus(500);
			}
		});

		return Promise.resolve();
	};

	return { start };
};
