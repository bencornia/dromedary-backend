import { validationResult } from 'express-validator';
import { deleteImageFromServer } from '../helpers/deleteImage.helper';
import { Request, Response, NextFunction } from 'express';

export function validateResult(
	req: Request,
	res: Response,
	next: NextFunction
) {
	// Check for validation errors
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		if (req.body.profileImagePath) {
			deleteImageFromServer(req.body.profileImagePath);
		}
		return res.status(400).json({ errors: errors.array() });
	}

	next();
}
