import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { AppointmentStatus } from '@prisma/client';

export async function POST(req: NextRequest) {
  try {
    const { userId, serviceId, detailerId, startTime, vehicleSize, totalPrice } = await req.json();

    if (!userId || !serviceId || !detailerId || !startTime || !vehicleSize || !totalPrice) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const start = new Date(startTime);
    // Assume 2 hour slots for simplicity or fetch duration from service
    const service = await prisma.service.findUnique({ where: { id: serviceId } });
    if (!service) return NextResponse.json({ error: 'Service not found' }, { status: 404 });
    
    const end = new Date(start.getTime() + service.duration * 60000);

    // Atomic Booking logic using Serializable transaction
    const result = await prisma.$transaction(async (tx) => {
      // 1. Check for overlapping appointments for the same detailer
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

      // 2. Create the appointment in PENDING status
      const appointment = await tx.appointment.create({
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

      return appointment;
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
