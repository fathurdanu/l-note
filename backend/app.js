const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
require('dotenv').config()

const cors = require('cors')

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const routes = require('./routes');
app.use(routes)

const errHandling = require('./middlewares/error');
app.use(errHandling);

app.listen(port, () => {
    console.log(`App is listening on ${port}`);
})