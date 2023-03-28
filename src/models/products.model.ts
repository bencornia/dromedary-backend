import mongoose from 'mongoose';
const { Schema } = mongoose;

const productModel = new Schema({
	businessId: String,
	productName: String,
	productQuantity: Number,
	productPrice: Number,
});

export const Product = mongoose.model('Product', productModel);
