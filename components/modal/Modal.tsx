'use client';

import React, {
  Dispatch,
  FormEvent,
  ReactNode,
  SetStateAction,
} from 'react';
import Button from '../button/Button';

interface ModalProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  onSubmit: (event: FormEvent) => void;
  children: ReactNode;
  confirmText: string;
  loading?: boolean;
}

const Modal = ({
  open,
  setOpen,
  children,
  confirmText,
  onSubmit,
  loading,
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
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 flex flex-row gap-2">
              <Button
                type="primary"
                loading={loading}
                onClick={onSubmit}
              >
                {confirmText}
              </Button>
              <Button
                onClick={() => {
                  setOpen(false);
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
