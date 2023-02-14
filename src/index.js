/* eslint-disable import/extensions */
import express from 'express';
import router from './v1/routes/index.js';

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = 'http://0.0.0.0';

// router
app.use('/api/v1', router);

app.listen(PORT, () => {
  console.info(`API is listening on port ${HOST}:${PORT}`);
});
