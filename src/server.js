const app = require('./app');
const port = 3000;

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
}).on('error', (err) => {
    console.error('Failed to start server:', err);
    process.exit(1);
});
