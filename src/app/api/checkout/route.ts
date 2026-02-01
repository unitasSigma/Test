import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

export async function POST(req: NextRequest) {
  try {
    const { appointmentId, serviceName, price } = await req.json();

    if (!stripe) {
      // Mock successful redirect for demo
      return NextResponse.json({ url: '/admin?status=success&mock=true' });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `Apex Gloss: ${serviceName}`,
            },
            unit_amount: Math.round(price * 100),
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${req.nextUrl.origin}/admin?status=success`,
      cancel_url: `${req.nextUrl.origin}/booking?status=cancelled`,
      metadata: {
        appointmentId,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Checkout Error:', error);
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 });
  }
}
