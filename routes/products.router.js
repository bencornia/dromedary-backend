const { Router } = require('express');
const express = require('express');

// Import middleware
const { validateObjectId } = require('../middleware/objectId.middleware');
const { validateResult } = require('../middleware/validateResult.middleware');
const { checkAuth } = require('../middleware/checkAuth.middleware');

// Import controllers
const prodController = require('../controllers/products.controller');
const { productValidator } = require('../validation/product.validation');
const { body } = require('express-validator');

const productsRouter = Router();
const productImageFieldName = 'productImage';

// Mount json parser for all routes
productsRouter.use(express.json());

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

module.exports = { productsRouter };
