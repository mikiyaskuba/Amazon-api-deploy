
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

// Load environment variables from .env file
dotenv.config();

// Ensure the STRIPE_KEY environment variable is defined
// if (!process.env.STRIPE_KEY) {
// 	throw new Error("STRIPE_KEY environment variable is not defined.");
// }

// Initialize Stripe with your secret key
const stripe = require("stripe")(process.env.STRIPE_KEY);

const app = express();

// Use CORS middleware to allow cross-origin requests
app.use(cors({ origin: true }));
app.use(express.json());

// Define a simple route to check the server status
app.get("/", (_req, res) => {
	res.status(200).json({
		message: "Success",
	});
});

// Define a route to create a payment intent
app.post("/payment/create", async (req, res) => {
	const total = req.query.total;
	if (total > 0) {
		const paymentIntent = await stripe.paymentIntents.create({
			amount: total,
			currency: "usd",
		});
		
		res.status(201).json({
            clientSecret: paymentIntent.client_secret,
            
		});
	} else {
		res.status(403).json({
			message: "Invalid amount",
		});
	}
    });
    app
    .listen(3000, (err) => {
        if (err) {
            console.log(err);
            } else {
                console.log("Server is running on port 3000 ,http://localhost:3000");
                }
        });
