'use client';

import { TrashIcon } from '@heroicons/react/24/solid';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import Modal from '../modal/Modal';

const Delete = ({ color, id }: { color: string; id: string }) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const proceed = () => {
    setLoading(true);
    axios
      .delete(`/api/games/${id}`)
      .then((res) => {
        console.log('res', res);
        toast.success(`has been deleted!`);
        setOpen(false);
        router.refresh();
      })

      .catch((err) => {
        toast.error(err?.message ?? 'Something went wrong!');
      })
      .finally(() => setLoading(false));
  };

  return (
    <div>
      <div
        className="p-2 rounded-md"
        style={{ backgroundColor: color }}
        onClick={() => setOpen(true)}
      >
        <TrashIcon className="h-5 text-error" />
      </div>
      <Modal
        loading={loading}
        open={open}
        setOpen={setOpen}
        onSubmit={proceed}
        confirmText="Delete"
      >
        asdfad
      </Modal>
    </div>
  );
};

export default Delete;
