import { NextResponse } from 'next/server';

import prisma from '../../lib/prismadb';
import { toast } from 'react-hot-toast';

export async function POST(request: Request) {
  const body = await request.json();
  const { name, gameId } = body;

  if (!gameId) {
    return toast.error('Something went wrong!');
  }

  if (!name) {
    return new NextResponse('Missing Fields', { status: 400 });
  }

  //   Object.keys(body).forEach((value: any) => {
  //     if (!body[value]) {
  //       NextResponse.error();
  //     }
  //   });

  const category = await prisma.category.create({
    data: {
      name,
      gameId,
    },
  });

  return NextResponse.json(category);
}
