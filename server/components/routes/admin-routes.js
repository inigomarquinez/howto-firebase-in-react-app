const express = require('express');
const helmet = require('helmet');
const validator = require('swagger-endpoint-validator');

module.exports = () => {
	const start = async ({ manifest = {}, app, config }) => {
		app.use(express.urlencoded({ extended: true }));
		app.use(express.json());
		app.use(helmet());

		await validator.init(app, config.swaggerValidator);

		app.get('/__/manifest', (_req, res) => res.json(manifest));

		return Promise.resolve();
	};

	return { start };
};
