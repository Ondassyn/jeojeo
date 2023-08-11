import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { toast } from 'react-hot-toast';
import prisma from '../../lib/prismadb';

export interface Params {
  playId: string;
  gameId: string;
}

export default async function createSession(params: Params) {
  try {
    const { playId, gameId } = params;
    const { getUser } = getKindeServerSession();
    const user = getUser();
    if (!user?.id) {
      toast.error('Unauthorized');
      return;
    }

    const deleted = await prisma.session.deleteMany({
      where: { userId: user.id },
    });

    const session = await prisma.session.create({
      data: {
        playId,
        gameId,
        userId: user.id,
      },
    });

    return session;
  } catch (error: any) {
    throw new Error(error);
  }
}
