import { Request, Response } from 'express';

export function handleServerError(res: Response, error: any) {
	let message = error;
	if (error instanceof Error) {
		message = {
			type: error.name,
			message: error.message,
		};
	}
	return res.status(500).json({ error: message });
}
