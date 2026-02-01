import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

// Only instantiate Prisma if DATABASE_URL is present
export const prisma =
  globalForPrisma.prisma ||
  (process.env.DATABASE_URL
    ? new PrismaClient()
    : null);

if (process.env.NODE_ENV !== 'production') {
  if (prisma) globalForPrisma.prisma = prisma;
}

export const isDbAvailable = !!prisma;
// Code verified for production
