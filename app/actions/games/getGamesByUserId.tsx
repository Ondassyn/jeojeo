import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import prisma from '../../lib/prismadb';

export default async function getGamesByUserId() {
  try {
    const { getUser } = getKindeServerSession();
    const user = getUser();
    if (!user?.id) {
      return [];
    }

    const games = await prisma.game.findMany({
      where: { userId: user.id },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return games;
  } catch (error: any) {
    throw new Error(error);
  }
}
