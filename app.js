const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const { urlencoded } = require('body-parser');
const path = require('path');
const erorrController = require('./controllers/error');

const app = express();

app.set('view engine', 'ejs');
app.set('views','views');

const adminRoutes = require('./router/admin');
const shopRoutes  = require('./router/shop');


app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')));

app.use('/admin',adminRoutes);
app.use(shopRoutes);
app.use(erorrController.get404);
app.listen(3000);
