/* eslint-disable @typescript-eslint/no-var-requires */
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("Seeding...");

  // Create users
  for (let i = 1; i <= 100; i++) {
    const user = await prisma.user.create({
      data: {
        name: `User ${i}`,
        email: `user${i}@example.com`,
      },
    });

    // Create authors
    if (i % 2 === 0) {
      // Let's say every second user is an author
      const author = await prisma.author.create({
        data: {
          userId: user.id,
        },
      });

      // Create books for each author
      for (let j = 1; j <= 10; j++) {
        const book = await prisma.book.create({
          data: {
            title: `Book ${j} by Author ${user.id}`,
            authorId: author.id,
          },
        });

        // Create reviews for each book
        for (let k = 1; k <= 5; k++) {
          await prisma.review.create({
            data: {
              content: `Review ${k} for Book ${j} by Author ${user.id}`,
              rating: Math.floor(Math.random() * 5) + 1,
              bookId: book.id,
              userId: user.id,
              authorId: author.id,
            },
          });
        }
      }
    }
  }
}

main()
  .then(() => {
    console.log("Seeding finished.");
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
