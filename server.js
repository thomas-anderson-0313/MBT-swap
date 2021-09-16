require('dotenv').config()
const express = require("express");
const app = express();
// This is a sample test API key. Sign in to see examples pre-filled with your key.
const stripe = require("stripe")(process.env.STRIPE_KEY);

app.use(express.static("build"));

app.use(express.json());

const calculateOrderAmount = items => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return 14;
};


app.post("/create-payment-intent", async (req, res) => {
  const { items } = req.body;
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "inr"
  });

  res.send({
    clientSecret: paymentIntent.client_secret
  });
});

app.listen(process.env.PORT, () => console.log('Node server listening on port ' + process.env.PORT));
