const Products = require('../Models/productModel');
const { getPostData } = require('../utils');

// @desc    Get All Products
// @route   GET api/products
async function getProducts(req, res) {
  try {
    const products = await Products.findAll();

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(products));
  } catch (error) {
    console.log(error);
  }
}

// @desc    Get Single Product
// @route   GET api/products/:id
async function getProduct(req, res, id) {
  try {
    const product = await Products.findById(id);

    if (!product) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Product Not Found' }));
    } else {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(product));
    }
  } catch (error) {
    console.log(error);
  }
}

// @desc    Create a Product
// @route   POST api/products
async function createProduct(req, res) {
  try {
    const body = await getPostData(req);

    const { name, description, price } = JSON.parse(body);

    const product = {
      name,
      description,
      price,
    };

    const newProduct = await new Products.create(product);

    res.writeHead(201, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify(newProduct));
  } catch (error) {
    console.log(error);
  }
}

// @desc    Update a Product
// @route   PUT api/products/:id
async function updateProduct(req, res, id) {
  try {
    const productById = await Products.findById(id);

    if (!productById) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Product Not Found' }));
    } else {
      const body = await getPostData(req);

      const { name, description, price } = JSON.parse(body);

      const productData = {
        name: name || productById.name,
        description: description || productById.description,
        price: price || productById.price,
      };

      const updateProduct = await new Products.update(id, productData);

      res.writeHead(200, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify(updateProduct));
    }
  } catch (error) {
    console.log(error);
  }
}

// @desc    Delete a Product
// @route   DELETE api/products/:id
async function deleteProduct(req, res, id) {
  try {
    const productById = await Products.findById(id);

    if (!productById) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Product Not Found' }));
    } else {
      await Products.remove(id);

      res.writeHead(200, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ message: `Product ${id} removed` }));
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
