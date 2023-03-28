import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

import { config } from '../config/config';
import { handleServerError } from './serverError';

export function checkAuth(req: Request, res: Response, next: NextFunction) {
	try {
		// Get the token
		const token = req.headers.authorization.split(' ')[1];

		jwt.verify(token, config.secretKey);
	} catch (error) {
		return handleServerError(res, error);
	}
	next();
}
