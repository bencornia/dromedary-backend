import * as dotenv from 'dotenv';
dotenv.config();

export const config = {
	connectionString: process.env.DB_CONNECTION_STRING,
	secretKey: process.env.SECRET_KEY,
};
