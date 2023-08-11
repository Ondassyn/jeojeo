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
        <div className="flex flex-row justify-center items-center gap-4">
          <p className="text-2xl">{name}</p>
          {editable && (
            <div className="flex flex-row items-center">
              <PencilIcon
                className="h-4 cursor-pointer"
                onClick={() => setEditing(true)}
              />
            </div>
          )}
        </div>
      )}
      {editable && <Delete id={categoryId} />}
    </div>
  );
};

export default CategoryName;
