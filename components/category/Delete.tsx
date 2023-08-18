'use client';

import { TrashIcon } from '@heroicons/react/24/solid';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { FormEvent } from 'react';
import { toast } from 'react-hot-toast';

const Delete = ({ id }: { id: string }) => {
  const router = useRouter();
  const onDelete = (event: FormEvent) => {
    event.preventDefault();

    axios
      .delete(`/api/categories/${id}`)
      .then(() => {
        toast.success('The category has been deleted!');

        router.refresh();
      })

      .catch((err) => {
        toast.error(err?.message ?? 'Something went wrong!');
      });
  };
  return (
    <TrashIcon
      className="h-5 mr-2 cursor-pointer text-error ml-auto
      hover:h-6 transition-all ease-in-out duration-200"
      onClick={onDelete}
    />
  );
};

export default Delete;
