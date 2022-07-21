const { Router } = require('express');
const FileController = require('../controllers/file.controller');
const FileService = require('../services/file.service');
const FileModel = require('../models/file.model');
const FileAdapter = require('../../lib/file.adapter');
const fileMiddelware = require('../middlewares/file.middleware');

const fileRotuer = Router();
const controller = new FileController(
	new FileService(
		new FileAdapter(),
		FileModel,
	)
);

fileRotuer.put('/:name', fileMiddelware, (req, res) => controller.put(req, res));
fileRotuer.get('/:name', fileMiddelware, (req, res) => controller.get(req, res));

module.exports = fileRotuer;
