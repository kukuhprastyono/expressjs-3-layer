import app from './src/app.js';

const PORT = process.env.PORT || 3000;
// const HOST = 'http://0.0.0.0';
app.listen(PORT, () => {
	// console.info(`API is listening on port ${HOST}:${PORT}`);
});
