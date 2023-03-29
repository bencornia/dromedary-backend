import { Router } from 'express';
// import express from 'express';
import { body } from 'express-validator';

// Import middlewares
import { createUserValidator } from '../validation/users.validation';
import { validateObjectId } from '../middleware/objectId.middleware';
import { encryptPassword } from '../middleware/encryptData.middleware';
// import { uploadWrapper } from '../middleware/uploadImage.middleware';
import { validateResult } from '../middleware/validateResult.middleware';

// Import controllers
import * as userController from '../controllers/users.controller';

export const usersRouter = Router();
// const imageFieldName = 'profileImage';

// GET
usersRouter.get('', userController.getUsers);
usersRouter.get('/:id', validateObjectId, userController.getUser);

// POST
usersRouter.post(
	'',
	// uploadWrapper(imageFieldName),
	createUserValidator,
	validateResult,
	encryptPassword,
	userController.postUser
);

// PUT
usersRouter.put(
	'/:id',
	validateObjectId,
	// uploadWrapper(imageFieldName),
	userController.putUser
);
usersRouter.put(
	'/password/:id',
	// checkAuth,
	// express.json(),
	body('currentPassword')
		.not()
		.isEmpty()
		.trim()
		.isLength({ min: 8 })
		.matches(
			/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/gm
		),
	body('newPassword')
		.not()
		.isEmpty()
		.trim()
		.isLength({ min: 8 })
		.matches(
			/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/gm
		),
	validateObjectId,
	userController.updatePassword
);

// DELETE
usersRouter.delete('/:id', validateObjectId, userController.deleteUser);

// login
usersRouter.post('/login', userController.login);
