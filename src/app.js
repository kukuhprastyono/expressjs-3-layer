/* eslint-disable import/extensions */
import bodyParser from 'body-parser';
import express from 'express';
import v1Router from './routers/v1/index.js';

const app = express();

app.get('/', (req, res) => {
	res.status(200).send('service work perfectly');
});

app.use(bodyParser.json());

app.use('/api/v1', v1Router);

export default app;
