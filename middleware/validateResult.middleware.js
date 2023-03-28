const { validationResult } = require('express-validator');
const { deleteImage } = require('../helpers/deleteImage.helper');

function validateResult(req, res, next) {
	// Check for validation errors
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		if (req.body.profileImagePath) {
			deleteImage(req.body.profileImagePath);
		}
		return res.status(400).json({ errors: errors.array() });
	}

	next();
}

module.exports = { validateResult };
