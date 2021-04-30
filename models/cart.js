const fs = require('fs');
const path = require('path');


const cartRoot = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'cart.json'
  );

module.exports = class Cart {
    static addProduct(id, price) {
        // Fetch the previous cart
        fs.readFile(cartRoot, (err, fileContent) => {
            let cart = { products: [], totalPrice: 0 };
            if (!err) {
              cart = JSON.parse(fileContent);
            }
            const exisitingProdIndex = cart.products.findIndex((item) => item.id === id);
            if (exisitingProdIndex !== -1) {
              cart.products[exisitingProdIndex].qty += 1;
            } else {
              cart.products.push({ id, qty: 1 });
            }
            cart.totalPrice += +price;
            fs.writeFile(cartRoot, JSON.stringify(cart), (err) => {
              console.log(err);
            });
          });
        }

      static deleteProduct(id, productPrice) {
        fs.readFile(cartRoot, (err, fileContent) => {
          if (err) {
            return;
          }
          const updatedCart = { ...JSON.parse(fileContent) };
          const product = updatedCart.products.find(prod => prod.id === id);
          if(!product){
              return;
          }
          const productQty = product.qty;
          updatedCart.products = updatedCart.products.filter(
            prod => prod.id !== id
          );
          updatedCart.totalPrice =
            updatedCart.totalPrice - productPrice * productQty;
    
          fs.writeFile(cartRoot, JSON.stringify(updatedCart), err => {
            console.log(err);
          });
        });
      };

      static getCart(cb) {
        fs.readFile(cartRoot,(err, fileContent) =>{
         const cart = JSON.parse(fileContent);
         if(err){
           cb(null);
         }
         cb(cart);
        });
    }
}