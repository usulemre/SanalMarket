const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    });
  });
};

exports.getProduct = (req,res,next) =>{
    const prodId = req.params.productId;
    Product.fetchID(prodId, product => {
      res.render('shop/product-detail', {
          pageTitle:product.title,
          product:product,
          path:'/products'
      })
    });
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    });
  });
};

exports.getCart = (req, res, next) => {
  Cart.getCart(cart =>{
    Product.fetchAll(products =>{
      const cartProducts = [];
     for(product of products){
       const cartProductData = cart.products.find(prod => prod.id === product.id);
       if(cartProductData){
        cartProducts.push({productData: product, qty: cartProductData.qty});
       }
     }
     res.render('shop/cart', {
      path: '/cart',
      pageTitle: 'Your Cart',
      products:cartProducts
    });
    });
  });
};

exports.postDeleteCart = (req,res,next) =>{
  const prodId = req.body.productId;
  Product.fetchID(prodId,product =>{
    Cart.deleteProduct(prodId, product.price);
    res.redirect('/cart');
  })
}

exports.postCart = (req,res,next) =>{
  const prodId = req.body.productId;
  Product.fetchID(prodId, product =>{
    Cart.addProduct(prodId,product.price);
  });
  res.redirect('/cart');
}

exports.getOrder = (req, res, next) => {
    res.render('shop/order', {
      path: '/order',
      pageTitle: 'Your Order'
    });
  };

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};
