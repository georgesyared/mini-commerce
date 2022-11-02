const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
import type { NextApiRequest, NextApiResponse } from 'next'
import { Stripe } from 'stripe';



export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
 
  const items : Product[] = req.body.items

  if (req.method === 'POST') {
    try {
      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: items?.map(item => ({
            price_data: {
              currency: 'usd',
              unit_amount: item.price,
              product_data: {
                name: item.name,
                description: item.description,
                images: [item.images[0].url],
              },
            },
          quantity: 1,
      
          }
        )),
        mode: 'payment',
        success_url: `${req.headers.origin}`,
        cancel_url: `${req.headers.origin}`,
        metadata : { images : JSON.stringify(items?.map(item => item.images[0]?.url)), }
      });
      res.status(200).json({ id : session.id })
    } catch (err : any ) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}