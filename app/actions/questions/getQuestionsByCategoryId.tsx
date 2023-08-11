import prisma from '../../lib/prismadb';

export interface Params {
  categoryId?: string;
}

export default async function getQuestionsByCategoryId(
  params: Params
) {
  try {
    const { categoryId } = params;

    const questions = await prisma.question.findMany({
      where: { categoryId },
      orderBy: {
        points: 'asc',
      },
    });

    return questions;
  } catch (error: any) {
    throw new Error(error);
  }
}
