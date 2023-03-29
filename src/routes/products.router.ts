import { Router } from 'express';
// import express from 'express';

// Import middleware
import { validateObjectId } from '../middleware/objectId.middleware';
import { validateResult } from '../middleware/validateResult.middleware';
import { checkAuth } from '../middleware/checkAuth.middleware';

// Import controllers
import * as prodController from '../controllers/products.controller';
import { body } from 'express-validator';

export const productsRouter = Router();

// // Mount json parser for all routes
// productsRouter.use(express.json());

// GET
productsRouter.get('', prodController.getAllProducts);
productsRouter.get(
	'/business/:id',
	validateObjectId,
	prodController.getProductsByBusiness
);

// GET by id
productsRouter.get(
	'/:id',
	checkAuth,
	validateObjectId,
	prodController.getProduct
);

// POST
productsRouter.post(
	'',
	checkAuth,
	body('businessId').not().isEmpty(),
	validateResult,
	prodController.postProduct
);

// PUT
productsRouter.put(
	'/:id',
	checkAuth,
	validateObjectId,
	prodController.putProduct
);

// DELETE
productsRouter.delete(
	'/:id',
	checkAuth,
	validateObjectId,
	prodController.deleteProduct
);

productsRouter.delete(
	'/business/:id',
	checkAuth,
	validateObjectId,
	prodController.deleteProductsByBusiness
);
