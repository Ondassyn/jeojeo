'use client';

import React, { FormEvent, useEffect, useState } from 'react';
import { PlusIcon } from '@heroicons/react/24/solid';
import Modal from '../modal/Modal';
import Input from '../input/Input';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

interface InitialStateProps {
  name: string;
  questionsPerCategory: number | null;
}

const initialState: InitialStateProps = {
  name: '',
  questionsPerCategory: 5,
};

const Create = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [state, setState] = useState(initialState);

  const handleChange = (e: any) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();

    axios
      .post('/api/games', state)
      .then(() => {
        toast.success('Game has been created!');
        setOpen(false);
        router.refresh();
      })

      .catch((err: any) => {
        toast.error(err?.response?.data ?? 'Something went wrong!');
      });
  };

  return (
    <div>
      <div
        className="w-64 h-48 rounded-xl border-dashed border-2 
        flex flex-col justify-center items-center cursor-pointer text-white"
        onClick={() => setOpen(true)}
      >
        <PlusIcon className="h-12" />
        <p>Create game</p>
      </div>
      <Modal
        open={open}
        setOpen={setOpen}
        confirmText="Create"
        onSubmit={onSubmit}
      >
        <div className="w-full p-2 flex flex-col gap-4">
          <h1 className="font-semibold leading-6 text-lg text-dark">
            Create game
          </h1>
          <form className="space-y-6" onSubmit={onSubmit}>
            <div className="flex p-2 flex-col gap-8">
              <div className="flex flex-col gap-2">
                <label className="text-dark">Name of the game</label>
                <Input
                  name="name"
                  placeholder="Name"
                  type="text"
                  value={state.name}
                  id="name"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-dark">
                  Number of questions per category
                </label>
                <Input
                  name="questionsPerCategory"
                  pattern="[0-9]*"
                  placeholder="Questions per category"
                  type="number"
                  value={state.questionsPerCategory}
                  id="questionsPerCategory"
                  onChange={(e) =>
                    setState({
                      ...state,
                      questionsPerCategory: !Number.isNaN(
                        e.target.valueAsNumber
                      )
                        ? e.target.valueAsNumber
                        : null,
                    })
                  }
                  required
                />
              </div>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default Create;
