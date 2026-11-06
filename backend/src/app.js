import cors from 'cors';
import express from 'express';
import { env } from './config/env.js';
import { optionalAuth } from './middlewares/auth.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFound } from './middlewares/notFound.js';
import routes from './routes/index.js';

const app = express();

app.use(cors({ origin: env.corsOrigin }));
app.use(express.json());
app.use(optionalAuth);

app.use('/api', routes);

app.use(notFound);
app.use(errorHandler);

export default app;
