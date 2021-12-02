const { StatusCodes } = require('http-status-codes');

module.exports = () => {
	const start = async ({
		app, store, logger, firebase,
	}) => {
		app.post('/registerDevice', async (req, res) => {
			try {
				const { body: { deviceId } } = req;
				await store.user.saveUserDevice(deviceId);
				res.sendStatus(StatusCodes.OK);
			} catch (error) {
				logger.error(error);
				res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
			}
		});

		app.post('/sendMessage', (req, res) => {
			try {
				if (req.body.deviceId) {
					firebase.sendMessage(req.body.deviceId);
					res.sendStatus(StatusCodes.OK);
				} else {
					res.sendStatus(StatusCodes.BAD_REQUEST);
				}
			} catch (error) {
				logger.error(error);
				res.sendStatus(500);
			}
		});

		return Promise.resolve();
	};

	return { start };
};
