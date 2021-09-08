const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const validator = require('swagger-endpoint-validator');

module.exports = () => {
	const start = async ({ manifest = {}, app, config }) => {
		app.use(express.urlencoded({ extended: true }));
		app.use(express.json());
		app.use(helmet());
		app.use(cors());

		await validator.init(app, config.swaggerValidator);

		app.get('/__/manifest', (_req, res) => res.json(manifest));

		return Promise.resolve();
	};

	return { start };
};
