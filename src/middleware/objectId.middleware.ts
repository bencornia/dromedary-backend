import { isValidObjectId } from 'mongoose';
import { Request, Response, NextFunction } from 'express';

export function validateObjectId(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const id = req.params.id;
	if (!isValidObjectId(id)) {
		// Bad request: Invalid id
		return res
			.status(400)
			.json({ message: `ID: ${id} is not valid object-id.` });
	}

	next();
}
