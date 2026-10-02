const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello, DevOps Pipeline is running!');
});

// Endpoint for Monitoring stage
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP', student_id: 's226490632' });
});

let server;
if (require.main === module) {
  server = app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
  });
}

module.exports = { app, server };