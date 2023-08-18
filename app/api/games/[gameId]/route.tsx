import { NextResponse } from 'next/server';
import prisma from '../../../lib/prismadb';

export async function DELETE(
  request: Request,
  { params }: { params: { gameId: string } }
) {
  const { gameId } = params;
  if (!gameId || typeof gameId !== 'string') {
    throw new Error('Invalid Id');
  }

  const game = await prisma.game.delete({
    where: {
      id: gameId,
    },
  });

  return NextResponse.json(game);
}
