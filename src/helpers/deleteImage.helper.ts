import fs from 'fs';
import path from 'path';

export function deleteImageFromServer(imagePath: string) {
	// Early return if path is null
	if (!imagePath) {
		return;
	}

	const regex = /default-profile.png$/g;
	if (regex.test(imagePath)) {
		return;
	}
	imagePath = imagePath.split('/').slice(-1)[0];
	imagePath = path.join(__dirname, '..', 'uploads', imagePath);

	fs.unlink(imagePath, (err) => {
		if (err) {
			console.log(err);
		}
		return;
	});
}
