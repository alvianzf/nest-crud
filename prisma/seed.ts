import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Seed some initial data
  await prisma.todos.createMany({
    data: [
      {
        title: 'First Todo',
        description: 'This is the first todo',
        is_done: false,
      },
      {
        title: 'Second Todo',
        description: 'This is the second todo',
        is_done: true,
      },
      { title: 'Third Todo', description: null, is_done: false },
    ],
  });
}

main()
  .then(() => {
    console.log('Seeding completed successfully.');
  })
  .catch((e) => {
    console.error('Seeding failed:', e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
