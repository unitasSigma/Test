import { NextRequest, NextResponse } from 'next/server';
import { prisma, isDbAvailable } from '@/lib/prisma';
import { AppointmentStatus } from '@prisma/client';

export async function POST(req: NextRequest) {
  try {
    const { userId, serviceId, detailerId, startTime, vehicleSize, totalPrice } = await req.json();

    if (!userId || !serviceId || !detailerId || !startTime || !vehicleSize || !totalPrice) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const start = new Date(startTime);
    const duration = 120; // Default 2 hours
    const end = new Date(start.getTime() + duration * 60000);

    if (!isDbAvailable) {
      // Mock success for demo
      return NextResponse.json({
        id: 'mock_' + Math.random().toString(36).substr(2, 9),
        status: 'PENDING',
        message: 'Mock booking successful (Database not connected)'
      });
    }

    // Atomic Booking logic using Serializable transaction
    const result = await prisma!.$transaction(async (tx) => {
      const overlapping = await tx.appointment.findFirst({
        where: {
          detailerId,
          status: { in: [AppointmentStatus.PENDING, AppointmentStatus.CONFIRMED, AppointmentStatus.IN_PROGRESS] },
          AND: [
            { startTime: { lt: end } },
            { endTime: { gt: start } },
          ],
        },
      });

      if (overlapping) {
        throw new Error('DETAIL_SLOT_TAKEN');
      }

      return await tx.appointment.create({
        data: {
          userId,
          serviceId,
          detailerId,
          startTime: start,
          endTime: end,
          status: AppointmentStatus.PENDING,
          vehicleSize,
          totalPrice,
        },
      });
    }, {
      isolationLevel: 'Serializable',
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('Booking Error:', error);
    if (error instanceof Error && error.message === 'DETAIL_SLOT_TAKEN') {
      return NextResponse.json({ error: 'This time slot is no longer available.' }, { status: 409 });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
