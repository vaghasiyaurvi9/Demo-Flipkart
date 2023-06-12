import 'dotenv/config.js'
import mongoose from 'mongoose';
import { ApolloServer } from 'apollo-server-express';
import express from "express";
import Stripe from 'stripe';
import http from 'http';
import cors from 'cors';
import Jwt from "jsonwebtoken";
import Carts from './src/model/CartSchema.js';
import Bills from './src/model/Bill.js';
import typeDefs from './src/Schema/index.js';
import resolvers from './src/Resolver/index.js';
const { KEY_TOKEN } = process.env;

const app = express();
app.use(cors()),

  app.use(express.static('public'));

const httpServer = http.createServer(app);

async function Server() {


  mongoose.connect('mongodb://127.0.0.1:27017/flipcartClone')
    .then(() => console.log('mongo Connected!'));

  const server = new ApolloServer({
    typeDefs,
    resolvers,

    // context: async ({ req }) => {
    //   let { authorization } = req.headers;
    //   const userId = Jwt.verify(authorization, KEY_TOKEN);
    //   const { id } = userId;
    //   return { id }

    // }


  });



  const createOrder = async (customer, data) => {

    const customerId = customer.id
    const query = { customerId: { $regex: customerId } };
    const cartData = await Carts.find(query);
    const result = await Carts.deleteMany(query);
    const invoice = await stripe.invoices.retrieve(
      data.invoice
    );
    const newOrder = new Bills({
      customerId: invoice.customer,
      InvoiceNumber: invoice.number,
      invoice_url: invoice.hosted_invoice_url,
      invoice_pdf: invoice.invoice_pdf,
      payment_status: invoice.status,
      shipping: data.customer_details,
      Product: cartData
    })
    const res = await newOrder.save();
    return {
      id: res.id,
      ...res._doc,
      result
    }
  };

  const stripe = new Stripe("sk_test_51N6WIySEXyEfFfEC2Gdy7czIdtzu2vcwU2nKHcMAacfFIMvjUzN0ea2xup5ylD8zkmxOr2CS6l3BpZpxlGMT7u0y006dNaPn0T");
  const endpointSecret = "whsec_8e8811bb17767af7a61f6e26ed1ff4c2437e827d5409e59a24c97feb286e34c2"

  app.post('/api/webhook', express.raw({ type: 'application/json' }), (request, response) => {
    const sig = request.headers['stripe-signature'];
    let data;
    let eventType;

    if (endpointSecret) {

      let event;
      try {
        event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
        console.log("webhook succeed"); mongoose.connect('mongodb://127.0.0.1:27017/flipcartClone')
          .then(() => console.log('mongo Connected!'));
      } catch (err) {
        console.log(`⚠️  Webhook signature verification failed: ${err.message}`);
        response.status(400).send(`Webhook Error: ${err.message}`);
        return;
      }
      data = event.data.object;
      eventType = event.type;
    } else {
      data = request.body.data.object;
      eventType = request.body.type;
    }


    if (eventType === "checkout.session.completed") {
      console.log("payment received");
      stripe.customers
        .retrieve(data.customer)
        .then(async (customer) => {

          try {
            createOrder(customer, data)
          } catch (error) {
            console.log(typeof createOrder);
            console.log(err);
          }
        })
    }
    response.status(200).end();
    response.send();

  });

  await server.start();

  server.applyMiddleware({ app, path: '/graphql', cors: false });

  await new Promise((resolve) => httpServer.listen({ port: 9000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:9000/graphql`);
}


Server()







