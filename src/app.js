/* eslint-disable import/extensions */
import bodyParser from 'body-parser';
import express from 'express';
import helmet from 'helmet';
import v1Router from './routers/v1/index.js';

const app = express();
app.use(helmet());

app.use(bodyParser.json());

app.use('/api/v1', v1Router);

app.get('/', (req, res) => {
	res.status(200).send('service work perfectly');
});

export default app;
