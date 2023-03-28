import multer, { FileFilterCallback } from 'multer';
import path from 'path';
import { Request, Response, NextFunction } from 'express';

function fileFilter(
	req: Request,
	file: Express.Multer.File,
	cb: FileFilterCallback
) {
	// Only allow png, jpg, or jpeg
	if (
		file.mimetype == 'image/png' ||
		file.mimetype == 'image/jpg' ||
		file.mimetype == 'image/jpeg'
	) {
		cb(null, true);
	} else {
		cb(null, false);
		return cb(new Error('Only .png, .jpg, and .jpeg format allowed!'));
	}
}

function fileName(
	req: Request,
	file: Express.Multer.File,
	cb: (error: Error, filename: string) => void
) {
	const uniqueSuffix = Date.now();
	const ext = path.extname(file.originalname);

	const imagePath = `${file.fieldname}-${uniqueSuffix}${ext}`;
	req.body.profileImagePath = imagePath;
	cb(null, imagePath);
}

function destination(
	req: Request,
	file: Express.Multer.File,
	cb: (error: Error, filename: string) => void
) {
	cb(null, 'uploads/');
}

/**
 Returns a middleware for uploading files from an incoming request.
 */
export function uploadWrapper(fieldname: string) {
	const storage = multer.diskStorage({
		destination: destination,
		filename: fileName,
	});

	const upload = multer({
		storage: storage,
		fileFilter: fileFilter,
		limits: { fileSize: 200000 },
	}).single(fieldname);

	return (req: Request, res: Response, next: NextFunction) => {
		upload(req, res, (err) => {
			// Check for any errors during upload
			if (err instanceof multer.MulterError) {
				return res.status(500).json({ error: err.message });
			} else if (err) {
				return res.status(500).json({ error: err });
			}

			// Continue
			next();
		});
	};
}
