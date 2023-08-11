import prisma from '../../lib/prismadb';

export interface Params {
  id?: string;
}

export default async function getGameById(params: Params) {
  try {
    const { id } = params;

    const game = await prisma.game.findUnique({
      where: { id },
    });

    return game;
  } catch (error: any) {
    throw new Error(error);
  }
}
