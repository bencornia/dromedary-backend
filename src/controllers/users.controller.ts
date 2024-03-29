import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';

import { config } from '../config/config';
import { User } from '../models/users.model';
import { handleServerError } from '../middleware/serverError';
// import { deleteImageFromServer } from '../helpers/deleteImage.helper';

export async function getUsers(req: Request, res: Response) {
	try {
		const users = await User.find({});

		if (!users) {
			return res.status(404).json({ error: 'No users exist' });
		}

		return res.status(200).json(users);
	} catch (error) {
		return handleServerError(res, error);
	}
}

export async function getUser(req: Request, res: Response) {
	// Get id
	let id = req.params.id;

	// Try making request
	try {
		const user = await User.findById(id);

		if (!user) {
			// User not found
			return res
				.status(404)
				.json({ message: `Resource with ID: [ ${id} ] not found.` });
		}

		// User found
		return res.status(200).json(user);
	} catch (error) {
		// Server error
		return handleServerError(res, error);
	}
}

export async function postUser(req: Request, res: Response) {
	try {
		// Assign default image
		// if (!req.body.profileImagePath) {
		// 	req.body.profileImagePath = `${req.protocol}://${req.get(
		// 		'host'
		// 	)}/images/default-profile.png`;
		// } else {
		// 	req.body.profileImagePath = `${req.protocol}://${req.get(
		// 		'host'
		// 	)}/images/${req.body.profileImagePath}`;
		// }

		const document = {
			businessName: req.body.businessName,
			ownerName: req.body.ownerName,
			email: req.body.email,
			password: req.body.password,
			// profileImagePath: req.body.profileImagePath,
			createdDate: new Date().toISOString(),
			lastUpdatedDate: new Date().toISOString(),
		};

		// Check for existing user
		const existing = await User.exists({ email: req.body.email });

		if (existing) {
			// deleteImageFromServer(req.body.profileImagePath);
			return res.status(400).json({ error: 'Email already exists!' });
		}

		// Create a new user
		const user = await User.create(document);

		return res.status(201).json({ id: user._id });
	} catch (error) {
		// Delete image
		// deleteImageFromServer(req.body.profileImagePath);

		// Document Creation failed
		return handleServerError(res, error);
	}
}

export async function putUser(req: Request, res: Response) {
	// Try making request
	try {
		// Check for valid object id
		let id = req.params.id;

		// Find user
		const user = await User.findById(id);

		if (!user) {
			// User not found
			return res
				.status(404)
				.json({ message: `Resource with ID: [ ${id} ] not found.` });
		}

		// Delete image
		// if (req.body.profileImagePath) {
		// 	// deleteImageFromServer(user.profileImagePath);
		// }

		// Assign default image
		// if (!req.body.profileImagePath) {
		// 	req.body.profileImagePath = `${req.protocol}://${req.get(
		// 		'host'
		// 	)}/images/default-profile.png`;
		// } else {
		// 	req.body.profileImagePath = `${req.protocol}://${req.get(
		// 		'host'
		// 	)}/images/${req.body.profileImagePath}`;
		// }

		// Make update
		for (const prop in req.body) {
			user[prop] = req.body[prop];
		}

		user.lastUpdatedDate = new Date().toISOString();
		await user.save();

		// User found
		return res.sendStatus(204);
	} catch (error) {
		// Server error
		return handleServerError(res, error);
	}
}

export async function deleteUser(req: Request, res: Response) {
	let id = req.params.id;
	try {
		// Find user
		const user = await User.findById(id);

		if (!user) {
			// User not found
			return res
				.status(404)
				.json({ message: `Resource with ID: [ ${id} ] not found.` });
		}

		const result = await User.deleteOne({ _id: id });

		if (result.deletedCount === 0) {
			throw new Error('Deletion Failed!');
		}
		// delete profile image
		// deleteImageFromServer(user.profileImagePath);

		// Successful deletion
		return res.sendStatus(204);
	} catch (error) {
		return handleServerError(res, error);
	}
}

// Handle login
export async function login(req: Request, res: Response, next) {
	try {
		const password = req.body.password;
		const email = req.body.email;

		// Check for existing user
		const user = await User.findOne({ email: email });
		if (!user) {
			return res.status(401).json({ message: 'User does not exist!' });
		}

		// Compare password
		const isValidPassword = await bcrypt.compare(password, user.password);
		if (!isValidPassword) {
			return res.status(401).json({ message: 'Authentication failed!' });
		}

		// Create jwt
		const token = jwt.sign(
			{ email: user.email, userId: user._id },
			config.secretKey,
			{ expiresIn: '1h' }
		);

		const loginResponse = {
			userId: user._id,
			businessName: user.businessName,
			// profileImagePath: user.profileImagePath,
			ownerName: user.ownerName,
			email: user.email,
			token: token,
			expiration: Date.now() + 3600000,
		};

		// Send success response
		return res.status(200).json(loginResponse);
	} catch (error) {
		handleServerError(res, error);
	}
}

export async function updatePassword(req: Request, res: Response) {
	try {
		// Check for existing user
		const user = await User.findOne({ _id: req.params.id });
		if (!user) {
			return res.status(401).json({ message: 'User does not exist!' });
		}

		// Compare password
		const isValidPassword = await bcrypt.compare(
			req.body.currentPassword,
			user.password
		);
		if (!isValidPassword) {
			return res.status(401).json({ message: 'Authentication failed!' });
		}

		// Create new password
		user.password = await bcrypt.hash(req.body.newPassword, 10);

		// Save user
		user.save();

		return res.sendStatus(204);
	} catch (error) {
		handleServerError(res, error);
	}
}
