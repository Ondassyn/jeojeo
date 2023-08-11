import { NextResponse } from 'next/server';
import { toast } from 'react-hot-toast';
import prisma from '../../../lib/prismadb';

export async function DELETE(
  request: Request,
  { params }: { params: { sessionId: string } }
) {
  const { sessionId } = params;
  console.log('params', params);

  if (!sessionId || typeof sessionId !== 'string') {
    throw new Error('Invalid Id');
  }

  const session = await prisma.session.delete({
    where: {
      id: sessionId,
    },
  });

  return NextResponse.json(session);
}
