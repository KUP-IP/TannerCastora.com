import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Prefer Prisma Accelerate/Data Proxy, then direct (non-pooled), then pooled
const candidateUrls = [
  process.env.POSTGRES_PRISMA_URL && process.env.POSTGRES_PRISMA_URL.startsWith('prisma://')
    ? process.env.POSTGRES_PRISMA_URL
    : undefined,
  process.env.POSTGRES_URL_NON_POOLING, // direct DSN (5432)
  process.env.DATABASE_URL,             // often pooled DSN (pgBouncer 6543)
  process.env.POSTGRES_URL,             // pooled DSN
].filter(Boolean) as string[];

const selectedUrl = candidateUrls.find(Boolean);

if (!selectedUrl) {
  throw new Error('No database URL found in environment variables');
}

// Debug database connection selection
console.log('🔍 Prisma Database Connection Debug:', {
  nodeEnv: process.env.NODE_ENV,
  hasDatabaseUrl: !!process.env.DATABASE_URL,
  hasPostgresUrl: !!process.env.POSTGRES_URL,
  hasPostgresPrismaUrl: !!process.env.POSTGRES_PRISMA_URL,
  hasNonPoolingUrl: !!process.env.POSTGRES_URL_NON_POOLING,
  selectedSource:
    (candidateUrls[0] === process.env.POSTGRES_PRISMA_URL && process.env.POSTGRES_PRISMA_URL?.startsWith('prisma://'))
      ? 'POSTGRES_PRISMA_URL (accelerate)'
      : candidateUrls[0] === process.env.POSTGRES_URL_NON_POOLING
      ? 'POSTGRES_URL_NON_POOLING'
      : candidateUrls[0] === process.env.DATABASE_URL
      ? 'DATABASE_URL'
      : 'POSTGRES_URL',
  selectedUrlStart: selectedUrl.substring(0, 50) + '...',
});

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['error', 'warn', 'query'] : ['error', 'warn'],
  datasources: {
    db: {
      url: selectedUrl
    }
  }
});

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;