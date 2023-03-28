const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
	businessName: String,
	ownerName: String,
	email: String,
	password: String,
	profileImagePath: String,
	createdDate: String,
	lastUpdatedDate: String,
});

const User = mongoose.model('User', userSchema);

module.exports = { User };
