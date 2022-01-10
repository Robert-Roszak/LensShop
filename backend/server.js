const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const productsRoutes = require('./routes/products.routes');
const orderRoutes = require('./routes/order.routes');

const app = express();

/* MONGOOSE */
mongoose.connect('mongodb://localhost:27017/lensShop', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
app.use(session({
  secret: 'hereIsRandomSecretCodeThatNobodyKnowsAbout!',
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({ mongooseConnection: db }),
}));

/* MIDDLEWARE */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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



db.once('open', () => {
  console.log('Successfully connected to the database');
});
db.on('error', err => console.log('Error: ' + err));

/* START SERVER */
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log('Server is running on port: '+port);
});
