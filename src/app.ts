import express from 'express';
import cors from 'cors';

import { indexRouter } from './routes/index.router';
import { notFound } from './controllers/not-found.controller';
import { connectDB } from './models/connection';

// Create app
const app = express();

const port = process.env.PORT || 3000;

// Set CORS policy
app.use(cors());

// Mount images on separate route
app.use('/images', express.static('./uploads'));

// Set up routing
app.use('/api', indexRouter);
app.use('*', notFound);

// Print information about directory
import * as fs from 'fs';
const cwd = process.cwd();

let subfolders = fs.readdirSync(cwd);

console.log('\nFilenames in directory:');
subfolders.forEach((file) => {
	console.log('File:', file);
});

// Connect database
connectDB().catch((err) => console.log('[ database ]:' + err));

// Start server
app.listen(port, () => {
	console.log(`[  server  ]: listening on port ${port}...`);
});
