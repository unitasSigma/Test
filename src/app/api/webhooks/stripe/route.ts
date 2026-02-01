import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { prisma, isDbAvailable } from '@/lib/prisma';
import { AppointmentStatus } from '@prisma/client';

export async function POST(req: NextRequest) {
  const payload = await req.text();
  const signature = req.headers.get('stripe-signature');

  if (!stripe || !signature || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ message: 'Webhook received (Mocked/Disabled)' }, { status: 200 });
  }

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      payload,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed' && isDbAvailable) {
    const session = event.data.object as any;
    const appointmentId = session.metadata.appointmentId;

    await prisma!.appointment.update({
      where: { id: appointmentId },
      data: { status: AppointmentStatus.CONFIRMED },
    });
  }

  return NextResponse.json({ received: true });
}
