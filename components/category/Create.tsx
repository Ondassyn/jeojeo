'use client';

import { PlusIcon } from '@heroicons/react/24/solid';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { FormEvent } from 'react';
import { toast } from 'react-hot-toast';

const Create = ({
  gameId,
  questionsPerCategory,
}: {
  gameId: string;
  questionsPerCategory: number;
}) => {
  const router = useRouter();
  const onSubmit = (event: FormEvent) => {
    event.preventDefault();

    axios
      .post('/api/categories', { name: 'New category', gameId })
      .then((res) => {
        for (let i = 0; i < questionsPerCategory; i++) {
          axios.post('/api/questions', { categoryId: res?.data?.id });
        }
      })
      .then(() => {
        toast.success('New category has been added!');

        router.refresh();
      })

      .catch((err) => {
        toast.error(err?.response?.data ?? 'Something went wrong!');
      });
  };

  return (
    <div>
      <div
        className="w-24 h-full rounded-xl border-dashed border-2 
        flex flex-col justify-center items-center cursor-pointer text-white"
        onClick={onSubmit}
      >
        <PlusIcon className="h-12" />
        <p className="text-center">Create category</p>
      </div>
    </div>
  );
};

export default Create;
