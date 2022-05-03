import express from "express";

const app = express();
const port = 19002; //add your port here
const PUBLISHABLE_KEY = "pk_test_uYutcjOEAFLWKxvdHKzCFeCw";
const SECRET_KEY = "sk_test_qblBKPZE3YOD7Cr5CTgTdBB6";
import Stripe from "stripe";

//Confirm the API version from your stripe dashboard
const stripe = Stripe(SECRET_KEY, { apiVersion: "2020-08-27" });

app.listen(port, () => {
  console.log(`Example app listening at http://10.162.21.79:${port}`);
});

app.post("/create-payment-intent", async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 100, //lowest denomination of particular currency
      currency: "usd",
      payment_method_types: ["card"], //by default
    });

    const clientSecret = paymentIntent.client_secret;

    res.json({
      clientSecret: clientSecret,
    });
  } catch (e) {
    console.log(e.message);
    res.json({ error: e.message });
  }
});