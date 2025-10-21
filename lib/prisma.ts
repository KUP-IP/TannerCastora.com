import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Prefer Prisma Accelerate/Data Proxy, then pooled, then direct non-pooled
const candidateUrls = [
  process.env.POSTGRES_PRISMA_URL, // prisma:// Accelerate/Data Proxy
  process.env.DATABASE_URL,       // often pooled DSN
  process.env.POSTGRES_URL,       // pooled DSN
  process.env.POSTGRES_URL_NON_POOLING, // direct DSN
];

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
  selectedSource: process.env.POSTGRES_PRISMA_URL
    ? 'POSTGRES_PRISMA_URL'
    : process.env.DATABASE_URL
    ? 'DATABASE_URL'
    : process.env.POSTGRES_URL
    ? 'POSTGRES_URL'
    : 'POSTGRES_URL_NON_POOLING',
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