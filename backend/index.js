const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const router = require('./routes');

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Import routes
app.use('/api', router)

const port = 3000
app.listen(port, () => {
  console.log(`Server app listening at http://localhost:${port}`)
})