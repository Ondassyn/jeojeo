import { NextRequest, NextResponse } from 'next/server';

import prisma from '../../lib/prismadb';
import { toast } from 'react-hot-toast';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

export async function POST(request: Request) {
  const { getUser } = getKindeServerSession();
  const user = getUser();

  if (!user?.id) {
    return toast.error('Something went wrong!');
  }

  const body = await request.json();
  const { name, questionsPerCategory } = body;

  if (!name || !questionsPerCategory) {
    return new NextResponse('Missing Fields', { status: 400 });
  }

  //   Object.keys(body).forEach((value: any) => {
  //     if (!body[value]) {
  //       NextResponse.error();
  //     }
  //   });

  const game = await prisma.game.create({
    data: {
      name,
      questionsPerCategory,
      userId: user.id,
    },
  });

  return NextResponse.json(game);
}

export async function GET(request: NextRequest) {
  // it is a good practice to wrap our API code within try...catch for error handling
  try {
    // const { getUser } = getKindeServerSession();
    // const user = getUser();

    // if (!user?.id) return NextResponse.json([]);

    const games = await prisma.game.findMany({
      // where: { userId: user.id },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return NextResponse.json(games);
  } catch (err) {
    console.log('ERROR: API - ', (err as Error).message);

    return NextResponse.json(err, { status: 200 });
  }
}
