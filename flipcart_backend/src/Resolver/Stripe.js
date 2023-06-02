import Carts from "../model/CartSchema.js";
import Stripe from "stripe";
const stripe = new Stripe('');
const FRONTEND_DOMAIN = "http://localhost:3000";



const Stripes = {

    Query: {
        createCheckoutSession: async (_, args) => {
            const userId = args.userId;
            const Stripe_Id = args.Stripe_Id
            const ModelCarts = await Carts.find({ userId })
            const cancel = FRONTEND_DOMAIN + "/cancel"
            const success = FRONTEND_DOMAIN + "/success"
          
            const paymentSession = await stripe.checkout.sessions.create({
                payment_method_types: ["card"],
                // submit_type: 'donate',
                shipping_address_collection: {
                  allowed_countries: ["IN", "US", "CA", "KE"]
                },
                // discounts: [{
                //   coupon: 'JWac2dvL',
                // }],
                shipping_options: [
                  {
                    shipping_rate_data: {
                      type: "fixed_amount",
                      fixed_amount: {
                        amount: 0,
                        currency: "inr",
                      },
                      display_name: "By shipping",
                      // Delivers between 5-7 business days
                      delivery_estimate: {
                        minimum: {
                          unit: "business_day",
                          value: 5,
                        },
                        maximum: {
                          unit: "business_day",
                          value: 7,
                        },
                      },
                    },
                  },
                  {
                    shipping_rate_data: {
                      type: "fixed_amount",
                      fixed_amount: {
                        amount: 150 * 100,
                        currency: "inr",
                      },
                      display_name: "Air By Next Day",
                      // Delivers in exactly 1 business day
                      delivery_estimate: {
                        minimum: {
                          unit: "business_day",
                          value: 1,
                        },
                        maximum: {
                          unit: "business_day",
                          value: 1,
                        },
                      },
                    },
                  },
                  {
                    shipping_rate_data: {
                      type: "fixed_amount",
                      fixed_amount: {
                        amount: 300 * 100,
                        currency: "inr",
                      },
                      display_name: "Air By in Hours",
                      // Delivers in exactly 1 business day
                      delivery_estimate: {
                        minimum: {
                          unit: 'hour',
                          value: 4,
                        },
                        maximum: {
                          unit: 'hour',
                          value: 8,
                        },
                      },
                    },
                  },
                ],
                phone_number_collection: {
                    enabled: true
                },
                line_items: ModelCarts.map((item) => {
                    return {
                        price_data: {
                            currency: "inr",
                            product_data: {
                                name: item.name,
                            },
                            unit_amount: item.price * 100,
                        },
                        quantity: item.quantity,
                    };
                }),
                mode: 'payment',
                invoice_creation: { enabled: true },
                customer: Stripe_Id,
                success_url: success,
                cancel_url: cancel
            })
            // console.log("paymentSession===",paymentSession);
            return JSON.stringify({
                url: paymentSession.url,
                cancel_url: paymentSession.cancel_url
            })


        }

    }

}
export default Stripes