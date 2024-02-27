const app = require('./app.js');
const PORT = parseInt(parseInt(process.env.PORT)) || 8080;

app.listen(PORT, () =>
  console.log(`Image processor listening on port ${PORT}`)
);