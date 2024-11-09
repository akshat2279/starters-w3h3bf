const express = require('express');
const { resolve } = require('path');

const cors = require('cors');
const app = express();

const port = 3000;

const taxRate = 5;
const discountPercentage = 10;
const loyaltyRate = 2;

app.use(express.static('static'));
app.use(cors());

app.get('/cart-total', (req, res) => {
  const newItemPrice = parseFloat(req.query.newItemPrice);
  const cartTotal = parseFloat(req.query.cartTotal);
  const total = newItemPrice + cartTotal;
  res.send(total.toString());
});

app.get('/membership-discount', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  const isMember = req.query.isMember;

  const total = isMember
    ? (cartTotal -= (cartTotal * discountPercentage) / 100)
    : cartTotal;
  res.send(cartTotal.toString());
});

app.get('/calculate-tax', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);

  const calculatedTax = (cartTotal * taxRate) / 100;

  res.send(calculatedTax.toString());
});

app.get('/estimate-delivery', (req, res) => {
  const distance = parseFloat(req.query.distance);
  const shippingMethod = req.query.shippingMethod;
  let deliveryDays;
  if (shippingMethod === 'express') {
    deliveryDays = Math.ceil(distance / 100);
  } else {
    deliveryDays = Math.ceil(distance / 50);
  }

  res.send(deliveryDays.toString());
});

app.get('/shipping-cost', (req, res) => {
  const distance = parseFloat(req.query.distance);
  const weight = parseFloat(req.query.weight);

  const shippingCost = weight * distance * 0.1;

  res.send(shippingCost.toString());
});

app.get('/loyalty-points', (req, res) => {
  const purchaseAmount = parseFloat(req.query.purchaseAmount);

  const loyaltyPointEarned = purchaseAmount * loyaltyRate;

  res.send(loyaltyPointEarned.toString());
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
