import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === "POST") {
    const params = {
      submit_type: "pay",
      payment_method_types: ["card"], 
      phone_number_collection: { enabled: true },
      billing_address_collection: "auto",
      shipping_options: [
        { shipping_rate: "shr_1MOfMsGfOnj4cFHmw3dnwqXD" },
        { shipping_rate: "shr_1MOfNUGfOnj4cFHmv6pQPYlx" },
      ],
      mode: "payment",
      line_items: req.body.map((item) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
            images: item.imageUrl,
          },
          unit_amount: item.price * 100,
        },
        adjustable_quantity: {
          enabled: true,
          minimum: 1,
        },
        quantity: item.quantity,
      })),

      success_url: `${req.headers.origin}/success`,
      cancel_url: `${req.headers.origin}/`,
    };

    try {
      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create(params);
      res.status(200).json(session);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
