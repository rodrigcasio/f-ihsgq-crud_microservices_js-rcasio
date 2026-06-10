const express = require('express');

const app = express();
const port = 5000;

// Middleware to parse JSON requests
app.use(express.json());

// Sample product data
let products = [
  { id: 143, name: 'Notebook', price: 5.49 },
  { id: 144, name: 'Black Marker', price: 1.99 }
];


//Add all the REST API end-points here

// request: http:localhost:5000/products (with GET)
app.get('/products', (req, res) => {
  res.json(products);
});

// request: http:localhost:5000/products/144 (with GET)
app.get('/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const productFound = products.find(x => x.id === id);
  
  if (productFound) {
    res.json(productFound);
    console.log(`Product found :)`);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }

});

// request: http:localhost:5000/products (with POST)
app.post('/products', (req, res) => {
  const newProduct = req.body;
  products.push(newProduct);
  res.status(201).send();
});


// request: http:localhost:5000/products/144 (with PUT)
app.put('/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const updateProduct = req.body;
  const product = products.find(x => x.id === id);
  
  if (product) {
    Object.assign(product, updateProduct) // update product properties
    res.status(204).send();
  } else {
    res.status(404).json({ message: 'Product not found' });
  }

});


// request: http:localhost:5000/products/144 (with DELETE)
app.delete('/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const productIndex = products.find(x => x.id === id);
  
  if (productIndex) {
    products.splice(productIndex, 1); // remove product from array
    res.status(204).send();
    console.log(`Product removed.`);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});


// Start the server
app.listen(port, () => {
  console.log(`Product server running at http://localhost:${port}`);
});
