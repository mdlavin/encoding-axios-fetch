import { PrismaClient, User } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.create({
    data: {
      name: 'Test',
      meta: {
        fr: 'éééééééééééééééé',
        'en-US': 'eeeeeeeeeeeeeeeee',
      },
    },
  });
}

main()
  .catch((err) => {
    console.log(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
