import prisma from '../../lib/prismadb';

export interface Params {
  sessionId?: string;
}

export const getHelloMessages = async (params: Params) => {
  try {
    const { sessionId } = params;

    const msgs = await prisma.message.findMany({
      where: { sessionId, message: 'Hi2All' },
      orderBy: {
        createdAt: 'asc',
      },
    });

    return msgs;
  } catch (error: any) {
    throw new Error(error);
  }
};
