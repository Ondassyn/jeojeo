'use client';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import Input from '../input/Input';
import DialogModal from '../modal/DialogModal';
import Modal from '../modal/Modal';
import PlayerBoard from './PlayerBoard';

const QuickPlay = () => {
  const router = useRouter();
  const [playId, setPlayId] = useState('');
  const [username, setUsername] = useState('');
  const [inGame, setInGame] = useState(false);

  return (
    <div className="h-screen bg-base flex flex-col justify-center items-center gap-4 text-xl font-semibold">
      <DialogModal
        open={!inGame}
        setOpen={setInGame}
        confirmText="Enter ->"
        onSubmit={() => {
          axios
            .post('/api/messages', {
              playId,
              username,
              message: 'Hi2All',
            })
            .then(() => {
              toast.success('Connected to the game');
              setInGame(true);
              setInGame(true);
            })
            .catch((err) => {
              toast.error(
                err?.response?.data ?? 'Something went wrong!'
              );
            });
        }}
      >
        <div className="w-full text-dark flex flex-col justify-center items-center gap-4 text-lg font-semibold py-4">
          <div className="flex flex-row gap-4 items-center">
            <p>Play ID</p>
            <div className="w-72">
              <Input
                type="text"
                value={playId}
                onChange={(e) => setPlayId(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-row gap-4 items-center">
            <p>Name</p>
            <div className="w-72">
              <Input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>
        </div>
      </DialogModal>
      {inGame && (
        <PlayerBoard
          username={username}
          playId={playId}
          setInGame={setInGame}
        />
      )}
    </div>
  );
};

export default QuickPlay;
