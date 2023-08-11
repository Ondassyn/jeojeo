import { toast } from 'react-hot-toast';
import { NextResponse } from 'next/server';

import prisma from '../../../lib/prismadb';

export async function PATCH(
  request: Request,
  { params }: { params: { questionId: string } }
) {
  const body = await request.json();
  const { text, points, answer, answerImage, questionImage } = body;
  const { questionId } = params;

  if (!questionId) {
    return toast.error('Something went wrong!');
  }

  //   Object.keys(body).forEach((value: any) => {
  //     if (!body[value]) {
  //       NextResponse.error();
  //     }
  //   });

  const category = await prisma.question.update({
    where: {
      id: questionId,
    },
    data: {
      text,
      points,
      answer,
      answerImage,
      questionImage,
    },
  });

  return NextResponse.json(category);
}
