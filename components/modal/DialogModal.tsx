'use client';

import React, {
  Dispatch,
  FormEvent,
  ReactNode,
  SetStateAction,
} from 'react';
import Button from '../button/Button';
import ElevatedButton from '../button/ElevatedButton';

interface ModalProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  onSubmit: (event: FormEvent) => void;
  children: ReactNode;
  confirmText: string;
}

const DialogModal = ({
  open,
  setOpen,
  children,
  confirmText,
  onSubmit,
}: ModalProps) => {
  return (
    <div
      className={`${open ? '' : 'hidden'} relative z-10`}
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-dark bg-opacity-75 transition-opacity"></div>

      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">{children}</div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <ElevatedButton
                type=""
                className="inline-flex w-full justify-center rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-opacity-90 sm:ml-3 sm:w-auto"
                onClick={onSubmit}
              >
                {confirmText}
              </ElevatedButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DialogModal;
