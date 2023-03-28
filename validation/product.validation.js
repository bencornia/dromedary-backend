const { body } = require('express-validator');

const productValidator = [
	body('productName').not().isEmpty().trim(),
	body('productQuantity').not().isEmpty().trim(),
	body('productPrice').not().isEmpty().trim(),
];

module.exports = { productValidator };
