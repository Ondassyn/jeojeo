import { NextResponse } from 'next/server';
import prisma from '../../lib/prismadb';

export async function POST(request: Request) {
  const body = await request.json();
  const { playId, username, message } = body;

  if (!playId || !username || !message) {
    return new NextResponse('Missing Fields', { status: 400 });
  }

  //   Object.keys(body).forEach((value: any) => {
  //     if (!body[value]) {
  //       NextResponse.error();
  //     }
  //   });

  const session = await prisma.session.findUnique({
    where: {
      playId,
    },
  });

  if (!session) {
    return new NextResponse(
      'Game with such Play ID has not been found',
      { status: 404 }
    );
  }

  const msg = await prisma.message.create({
    data: {
      sessionId: session.id,
      username,
      message,
    },
  });

  return NextResponse.json(msg);
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const sessionId = searchParams.get('sessionId');
  const playId = searchParams.get('playId');
  const username = searchParams.get('username');
  const message = searchParams.get('message');

  if (!sessionId && !playId) {
    return new NextResponse('Missing Fields', { status: 400 });
  }

  let msg;
  if (sessionId) {
    msg = await prisma.message.findMany({
      where: {
        sessionId,
        username: username === null ? undefined : username,
        message: message === null ? undefined : message,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  } else if (playId) {
    const session = await prisma.session.findUnique({
      where: {
        playId,
      },
    });
    if (!session) {
      return new NextResponse(
        'Game with such Play ID has not been found',
        { status: 404 }
      );
    }
    msg = await prisma.message.findMany({
      where: {
        sessionId: session.id,
        username: username === null ? undefined : username,
        message: message === null ? undefined : message,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  return NextResponse.json(msg);
}

export async function DELETE(request: Request) {
  const body = await request.json();
  const { sessionId } = body;

  if (!sessionId || typeof sessionId !== 'string') {
    throw new Error('Invalid session Id');
  }

  const msgs = await prisma.message.deleteMany({
    where: {
      sessionId,
    },
  });

  return NextResponse.json(msgs);
}
