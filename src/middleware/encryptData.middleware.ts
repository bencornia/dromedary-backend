import bcrypt from 'bcrypt';
import { Request, Response, NextFunction } from 'express';

import { handleServerError } from './serverError';

export async function encryptPassword(
	req: Request,
	res: Response,
	next: NextFunction
) {
	// Hash password
	try {
		req.body.password = await bcrypt.hash(req.body.password, 10);
	} catch (error) {
		return handleServerError(res, error);
	}

	next();
}

export async function encryptApiKey(
	req: Request,
	res: Response,
	next: NextFunction
) {
	if (!req.body.apiKey) {
		next();
		return;
	}

	// Hash apikey
	try {
		req.body.apiKey = await bcrypt.hash(req.body.apiKey, 10);
	} catch (error) {
		return handleServerError(res, error);
	}

	next();
}
