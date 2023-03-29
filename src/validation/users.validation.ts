import { body } from 'express-validator';

export const createUserValidator = [
	body('businessName').not().isEmpty().trim().escape(),
	body('ownerName').not().isEmpty().trim().escape(),
	body('email').not().isEmpty().isEmail(),
	body('password')
		.not()
		.isEmpty()
		.trim()
		.isLength({ min: 8 })
		.matches(
			/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/gm
		),
];
