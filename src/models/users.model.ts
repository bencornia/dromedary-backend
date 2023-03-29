import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
	businessName: String,
	ownerName: String,
	email: String,
	password: String,
	// profileImagePath: String,
	createdDate: String,
	lastUpdatedDate: String,
});

export const User = mongoose.model('User', userSchema);
