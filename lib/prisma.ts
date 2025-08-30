import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Debug database connection
console.log('🔍 Prisma Database Connection Debug:', {
  hasDatabaseUrl: !!process.env.DATABASE_URL,
  hasPostgresUrl: !!process.env.POSTGRES_URL,
  hasPostgresPrismaUrl: !!process.env.POSTGRES_PRISMA_URL,
  nodeEnv: process.env.NODE_ENV,
  databaseUrlStart: process.env.DATABASE_URL?.substring(0, 50) + '...',
  postgresUrlStart: process.env.POSTGRES_URL?.substring(0, 50) + '...'
});

const databaseUrl = process.env.DATABASE_URL || process.env.POSTGRES_PRISMA_URL || process.env.POSTGRES_URL;

if (!databaseUrl) {
  throw new Error('No database URL found in environment variables');
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['error', 'warn', 'query'] : ['error', 'warn'],
  datasources: {
    db: {
      url: databaseUrl
    }
  }
});

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;