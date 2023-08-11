import prisma from '../../lib/prismadb';

export interface Params {
  gameId?: string;
}

export default async function getCategoriesByGameId(params: Params) {
  try {
    const { gameId } = params;

    const categories = await prisma.category.findMany({
      where: { gameId },
      orderBy: {
        createdAt: 'asc',
      },
    });

    return categories;
  } catch (error: any) {
    throw new Error(error);
  }
}
