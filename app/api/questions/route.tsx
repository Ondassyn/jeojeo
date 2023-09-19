import { NextResponse } from 'next/server';

import prisma from '../../lib/prismadb';
import { toast } from 'react-hot-toast';

export async function POST(request: Request) {
  const body = await request.json();
  const {
    categoryId,
    text,
    points,
    questionImage,
    answer,
    answerImage,
    questionAudio,
  } = body;

  if (!categoryId) {
    return toast.error('Something went wrong!');
  }

  //   Object.keys(body).forEach((value: any) => {
  //     if (!body[value]) {
  //       NextResponse.error();
  //     }
  //   });

  const question = await prisma.question.create({
    data: {
      categoryId,
      text,
      points,
      questionImage,
      answer,
      answerImage,
      questionAudio,
    },
  });

  return NextResponse.json(question);
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const categoryId = searchParams.get('categoryId');

  let qs = await prisma.question.findMany({
    where: {
      categoryId: categoryId === null ? undefined : categoryId,
    },
    orderBy: {
      points: 'asc',
    },
  });

  return NextResponse.json(qs);
}
