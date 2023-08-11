import { NextResponse } from 'next/server';

import prisma from '../../lib/prismadb';
import getCurrentUser from '@/app/data/getCurrentUser';
import { toast } from 'react-hot-toast';

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return toast.error('Something went wrong!');
  }

  const body = await request.json();
  const { playId, gameId } = body;

  if (!playId) {
    return new NextResponse('Missing Fields', { status: 400 });
  }

  //   Object.keys(body).forEach((value: any) => {
  //     if (!body[value]) {
  //       NextResponse.error();
  //     }
  //   });

  const session = await prisma.session.create({
    data: {
      playId,
      gameId,
    },
  });

  return NextResponse.json(session);
}
