const {getProductById, getProducts, getStylesOfProduct, getRelatedProductIds} = require('./models.js');

let Products = async (req, res) => {
    try {
      const products = await getProducts(req.query.page, req.query.count);
      res.send(products);      
    } catch (error) {
      console.error('Error:', error);
      res.send('');
    }

};

let ProductInfo = async (req, res) => {
    try {
      const products = await getProductById(req.params.id);
      res.send(products);      
    } catch (error) {
      console.error('Error:', error);
      res.send('');
    }

  };
let ProductStyles = async (req, res) => {
    try {
      const products = await getStylesOfProduct(req.params.id);
      res.send(products);      
    } catch (error) {
      console.error('Error:', error);
      res.send('');
    }

  };

let ProductRelated = async (req, res) => {
    try {
      const products = await getRelatedProductIds(req.params.id);
      res.send(products);      
    } catch (error) {
      console.error('Error:', error);
      res.send('');
    }

  };

module.exports = {
    Products,
    ProductInfo,
    ProductStyles,
    ProductRelated

}