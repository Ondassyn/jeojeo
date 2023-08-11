import { NextResponse } from 'next/server';
import { toast } from 'react-hot-toast';
import prisma from '../../../lib/prismadb';

export async function PATCH(
  request: Request,
  { params }: { params: { categoryId: string } }
) {
  const body = await request.json();
  const { name } = body;
  const { categoryId } = params;

  if (!categoryId) {
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

  const category = await prisma.category.update({
    where: {
      id: categoryId,
    },
    data: {
      name,
    },
  });

  return NextResponse.json(category);
}

export async function DELETE(
  request: Request,
  { params }: { params: { categoryId: string } }
) {
  const { categoryId } = params;
  console.log('params', params);

  if (!categoryId || typeof categoryId !== 'string') {
    throw new Error('Invalid Id');
  }

  const category = await prisma.category.delete({
    where: {
      id: categoryId,
    },
  });

  return NextResponse.json(category);
}
