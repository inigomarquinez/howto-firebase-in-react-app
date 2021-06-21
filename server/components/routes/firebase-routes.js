module.exports = () => {
	const start = async ({ app }) => {
		app.post('/registerDevice', (_req, res) => res.sendStatus(200));

		app.post('/sendMessage', (_req, res) => res.sendStatus(200));

		return Promise.resolve();
	};

	return { start };
};
