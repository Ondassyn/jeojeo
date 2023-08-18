import { TrashIcon, XMarkIcon } from '@heroicons/react/24/solid';
import React, { Dispatch, SetStateAction } from 'react';
import Button from '../button/Button';

const ConfirmModal = ({
  open,
  setOpen,
  proceed,
  loading,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  proceed: () => void;
  loading?: boolean;
}) => {
  return (
    <div
      className={`${
        open ? '' : 'invisible'
      } overflow-y-auto overflow-x-hidden absolute flex right-0 left-0 z-10 justify-center items-center md:inset-0 sm:h-full bg-black bg-opacity-60`}
    >
      <div className="px-4 w-full max-w-4xl h-full md:h-auto">
        <div className="flex flex-col gap-12 bg-white p-6 rounded-lg drop-shadow-lg">
          <div className="flex flex-wrap justify-between">
            <div className="flex flex-row gap-2">
              <TrashIcon className="h-6 text-error" />

              <h6 className="text-xl font-semibold">Delete</h6>
            </div>
            <XMarkIcon
              className="h-6 text-secondary cursor-pointer"
              onClick={() => setOpen(false)}
            />
          </div>
          <div className="flex items-center justify-center">
            <p className="text-2xl font-semibold">
              Are you sure you want to delete it?
            </p>
          </div>
          <div className="flex flex-row gap-4 justify-end">
            <Button type="secondary" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              type={'error'}
              loading={loading}
              onClick={() => proceed()}
            >
              Delete
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
