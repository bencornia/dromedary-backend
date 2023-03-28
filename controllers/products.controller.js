const { Product } = require('../models/products.model');
const { validationResult } = require('express-validator');
const { handleServerError } = require('../middleware/serverError');

async function getAllProducts(req, res) {
	try {
		const products = await Product.find({});

		return res.status(200).json(products);
	} catch (error) {
		return handleServerError(res, error);
	}
}

async function getProductsByBusiness(req, res) {
	let id = req.params.id;

	try {
		const products = await Product.find({ businessId: id });

		return res.status(200).json(products);
	} catch (error) {
		return handleServerError(res, error);
	}
}

async function getProduct(req, res) {
	// Get id
	let id = req.params.id;

	try {
		const product = await Product.findById(id);

		if (!product) {
			return res
				.status(404)
				.json({ message: `Resource with ID: [ ${id} ] not found.` });
		}

		// Product found
		return res.status(200).json(product);
	} catch (error) {
		return handleServerError(res, error);
	}
}

async function postProduct(req, res) {
	try {
		// Create product
		const doc = {
			businessId: req.body.businessId,
			productName: req.body.productName,
			productQuantity: req.body.productQuantity,
			productPrice: req.body.productPrice,
		};

		const product = await Product.create(doc);

		return res.status(201).json(product);
	} catch (error) {
		return handleServerError(res, error);
	}
}

async function putProduct(req, res) {
	let id = req.params.id;

	try {
		let product = await Product.findById(id);

		if (!product) {
			return res
				.status(404)
				.json({ message: `Resource with ID: [ ${id} ] not found.` });
		}

		// Update product
		for (const prop in req.body) {
			product[prop] = req.body[prop];
		}

		product = await product.save();

		// Return updated result
		return res.status(201).json(product);
	} catch (error) {
		return handleServerError(res, error);
	}
}

async function deleteProduct(req, res) {
	let id = req.params.id;

	try {
		const result = await Product.deleteOne({ _id: id });

		if (result.deletedCount === 0) {
			// Product not found
			return res
				.status(404)
				.json({ message: `Resource with ID: [ ${id} ] not found.` });
		}
		// Successful deletion
		return res.sendStatus(204);
	} catch (error) {
		return handleServerError(res, error);
	}
}

async function deleteProductsByBusiness(req, res) {
	let id = req.params.id;

	try {
		const result = await Product.deleteMany({ businessId: id });

		if (!result.acknowledged) {
			return res.status(400).json({ message: 'Bad Request' });
		}
		console.log('deleted business inventory');
		return res.sendStatus(204);
	} catch (error) {
		return handleServerError(res, error);
	}
}

module.exports = {
	getAllProducts,
	getProductsByBusiness,
	getProduct,
	postProduct,
	putProduct,
	deleteProduct,
	deleteProductsByBusiness,
};
