const mongoose = require('mongoose');
const { Schema } = mongoose;

const productModel = new Schema({
	businessId: String,
	productName: String,
	productQuantity: Number,
	productPrice: Number,
});

const Product = mongoose.model('Product', productModel);

module.exports = { Product };
