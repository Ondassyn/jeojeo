'use client';

import {
  CheckIcon,
  PencilIcon,
  XMarkIcon,
} from '@heroicons/react/24/solid';
import axios from 'axios';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import Input from '../input/Input';
import Delete from './Delete';

const CategoryName = ({
  categoryName,
  categoryId,
}: {
  categoryName: string;
  categoryId: string;
}) => {
  const pathname = usePathname();
  const [name, setName] = useState(categoryName);
  const [editing, setEditing] = useState(false);
  const editable = pathname?.includes('/games/edit/');

  const onSubmit = () => {
    axios
      .patch(`/api/categories/${categoryId}`, { name })
      .then(() => {
        toast.success('Name has been changed!');
        // router.refresh();
      })

      .catch((err) => {
        toast.error(err?.response?.data ?? 'Something went wrong!');
      })
      .finally(() => setEditing(false));
  };

  return (
    <div className="w-full flex flex-row justify-center items-center">
      {editing ? (
        <div className="flex flex-row gap-4 items-center">
          <Input
            id="name"
            name="name"
            type="text"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
          />
          <div className="flex flex-row items-center gap-2">
            <CheckIcon
              className="h-5 cursor-pointer"
              onClick={onSubmit}
            />
            <XMarkIcon
              className="h-6 cursor-pointer"
              onClick={() => setEditing(false)}
            />
          </div>
        </div>
      ) : (
        <div className="w-2/3 flex flex-row justify-center items-center gap-4">
          <div className="w-5/6">
            <p className="text-xl truncate block">{name}</p>
          </div>
          {editable && (
            <PencilIcon
              className="h-4 w-10 cursor-pointer hover:h-5 transition-all ease-in-out duration-200"
              onClick={() => setEditing(true)}
            />
          )}
        </div>
      )}
      {editable && <Delete id={categoryId} />}
    </div>
  );
};

export default CategoryName;
