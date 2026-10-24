import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const CREDIT_MAP = {
  100: 100,
  200: 250,
  500: 1000,
};

export const createCreditOrder = async (req, res) => {
  try {
    const userId = req.userId;
    const { amount } = req.body;

    if (!CREDIT_MAP[amount]) {
      return res.status(400).json({ message: "Invalid Credit Plan" });
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/payment-success`,
      cancel_url: `${process.env.CLIENT_URL}/payment-failed`,
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: `${CREDIT_MAP[amount]} Credits`,
            },
            unit_amount: Number(amount) * 100,
          },
          quantity: 1,
        },
      ],
      metadata: {
        userId: String(userId), 
        credits: String(CREDIT_MAP[amount]),
      },
    });

    return res.status(200).json({ url: session.url });
  } catch (error) {
    console.error("createCreditOrder error:", error);
    return res.status(500).json({ message: "Could not create payment session" });
  }
};


export const stripeWebhook = async (req, res) => {
  let event;

  try {
    const signature = req.headers["stripe-signature"];
  
    event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (error) {
    console.error("Webhook signature error:", error.message);
    return res.status(400).send(`Webhook Error: ${error.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    if (session.payment_status === "paid") {
      const { userId, credits, amount } = session.metadata;

      try {
       
        await Payment.create({
          user: userId,
          planId: String(amount),
          amount: Number(amount),
          credits: Number(credits),
          orderId: session.id,
          paymentId: session.payment_intent,
          status: "paid",
        });

        await UserModel.findByIdAndUpdate(userId, {
          $inc: { credit: Number(credits) },
        });
      } catch (error) {
        if (error.code === 11000) {
          
          return res.status(200).json({ received: true });
        }
        console.error("Webhook processing error:", error);
        return res.status(500).json({ message: "Processing failed" }); 
      }
    }
  }

  return res.status(200).json({ received: true });
};