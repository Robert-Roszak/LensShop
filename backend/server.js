const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const helmet = require('helmet');

const productsRoutes = require('./routes/products.routes');
const orderRoutes = require('./routes/order.routes');

const app = express();

/* MIDDLEWARE */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' },
  contentSecurityPolicy: false,
}));

/* API ENDPOINTS */
app.use('/api', productsRoutes);
app.use('/api', orderRoutes);

/* API ERROR PAGES */
app.use('/api', (req, res) => {
  res.status(404).send({ message: 'Not found...' });
});

/* REACT WEBSITE */
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.static(path.join(__dirname, '../build')));
app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'));
});

/* MONGOOSE */
const NODE_ENV = process.env.NODE_ENV;

let dbUri = '';
if(NODE_ENV === 'production') dbUri = `mongodb+srv://${process.env.DBUSER}:${process.env.DBPASS}@cluster0.gtv2z.mongodb.net/lensShop?retryWrites=true&w=majority`;
else if(NODE_ENV === 'test') dbUri = 'mongodb://localhost:27017/lensShoptest';
else dbUri = 'mongodb://localhost:27017/lensShop';

mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
app.use(session({
  secret: 'hereIsRandomSecretCodeThatNobodyKnowsAbout!',
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({ mongooseConnection: db }),
}));

db.once('open', () => {
  console.log('Successfully connected to the database');
});
db.on('error', err => console.log('Error: ' + err));

/* START SERVER */
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log('Server is running on port: '+port);
});
