import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import initDB from './config/initDB';
import { isAuthorized } from './utils';
import userRoutes from './routes/user.router';
import countryRoutes from './routes/country.router';
import authRoutes from './routes/auth.router';

const app = express();
const corsOptions = cors({ origin: process.env.ORIGIN.split(',') });

initDB();

app.options('*', corsOptions);
app.use(corsOptions);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/users', isAuthorized, userRoutes);
app.use('/api/countries', isAuthorized, countryRoutes);

app.listen(process.env.PORT, () => console.info(`Server running on port ${process.env.PORT}`));
