import { Request, Response, NextFunction } from 'express';

export function notFound(req: Request, res: Response) {
	res.status(404).send({ message: 'page not found' });
}
