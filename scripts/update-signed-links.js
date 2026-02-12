const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const book = await prisma.book.findFirst();
    if (!book) {
        console.error('No book found');
        return;
    }

    const updatedBook = await prisma.book.update({
        where: { id: book.id },
        data: {
            hardcoverSignedStripeUrl: 'https://buy.stripe.com/6oU5kD10Pe9yglr8eX1B602',
            softcoverSignedStripeUrl: 'https://buy.stripe.com/28EdR97pd8Pe2uB7aT1B603',
        },
    });

    console.log('Book updated:', updatedBook);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
