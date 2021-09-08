const devices = [];

module.exports = () => {
	const start = async () => {
		const saveUserDevice = async deviceId => {
			devices.push(deviceId);
			console.log('devices :>> ', devices);
		};

		return {
			saveUserDevice,
		};
	};

	return { start };
};
