import mongoose from 'mongoose';
import { config } from '../config/config';

export async function connectDB() {
	await mongoose.connect(config.connectionString, { dbName: 'dromedarydb' });
	console.log('[ database ]: connected...');
}
