const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const {Products, ProductInfo, ProductStyles, ProductRelated} = require('./controllers.js');

app.get('/api/products', Products);
app.get('/api/products/:id', ProductInfo);
app.get('/api/products/:id/styles', ProductStyles);
app.get('/api/products/:id/related', ProductRelated);

app.listen(process.env.PORT, () => {
  console.log(`Server hosted on PORT : ${process.env.PORT}`);
});







