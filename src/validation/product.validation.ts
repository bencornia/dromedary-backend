import { body } from 'express-validator';

export const productValidator = [
	body('productName').not().isEmpty().trim(),
	body('productQuantity').not().isEmpty().trim(),
	body('productPrice').not().isEmpty().trim(),
];
