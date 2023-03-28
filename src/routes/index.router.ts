import { Router } from 'express';

import { usersRouter } from './users.router';
import { productsRouter } from './products.router';

export const indexRouter = Router();

indexRouter.use('/users', usersRouter);
indexRouter.use('/products', productsRouter);
