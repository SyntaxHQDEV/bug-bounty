import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_mock", {
  apiVersion: "2023-10-16",
});

export async function createPaymentIntent(payload) {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: payload.amount,
      currency: payload.currency ?? "usd",
      automatic_payment_methods: {
        enabled: true,
      },
    });

    return {
      paymentId: paymentIntent.id,
      amount: paymentIntent.amount,
      currency: paymentIntent.currency,
      clientSecret: paymentIntent.client_secret,
      provider: "stripe"
    };
  } catch (error) {
    throw new Error(`Stripe error: ${error.message}`);
  }
}
