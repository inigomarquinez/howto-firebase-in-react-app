const devices = [];

module.exports = () => {
	const start = async ({ logger }) => {
		const saveUserDevice = async deviceId => {
			if (devices.find(d => d === deviceId) === undefined) {
				logger.info(`Adding device ${deviceId}`);
				devices.push(deviceId);
			} else {
				logger.warn('This device has already been added');
			}
		};

		return {
			saveUserDevice,
		};
	};

	return { start };
};
