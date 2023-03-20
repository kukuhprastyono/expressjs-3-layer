/* eslint-disable import/extensions */
import bodyParser from 'body-parser';
import express from 'express';
// import router from './v1/routes/index.js';
import v1Router from './routers/v1/index.js';

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = 'http://0.0.0.0';

app.use(bodyParser.json());
// router
// app.use('/api/v1', router);
app.use('/api/v1', v1Router);

app.listen(PORT, () => {
  console.info(`API is listening on port ${HOST}:${PORT}`);
});
