const express = require("express");
const app = express();
const cors = require("cors");

// This is your test secret API key.
const stripe = require("stripe")(
  "sk_test_51LRfe1D25nTGHUiPo8TPQ2e6TSXm5TB66gZj02kRLXwP9yG7fCcKgBC4t0JCrl7sWs2CI5GkRHcIKxdf7ldJbaRI00xC2tx6qS"
);

const endpointSecret =
  "whsec_0a2938cb6351847a7db5ac653943d9c647c83dc5865a064ad0e57fc377d1d89c";

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(express.static("public"));
app.use(express.json());

const calculateOrderAmount = (cart) => {
  const totalCart = cart.reduce(
    (sum, item) => parseFloat(sum) + parseFloat(item.price * item.quantity),
    0
  );
  return totalCart * 100;
};

app.post("/create-payment-intent", async (req, res) => {
  const { items } = req.body;
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "eur",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

app.listen(3001, () => console.log("Node server listening on port 3001!"));
