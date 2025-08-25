-- Add noteText column to Book table
ALTER TABLE "Book" ADD COLUMN IF NOT EXISTS "noteText" TEXT;