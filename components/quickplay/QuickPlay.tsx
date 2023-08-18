'use client';

import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import Input from '../input/Input';
import PlayerBoard from './PlayerBoard';
import logo from '@/public/jeojeo-planet.png';
import ElevatedButton from '../button/ElevatedButton';

const QuickPlay = () => {
  const router = useRouter();
  const [playId, setPlayId] = useState('');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [inGame, setInGame] = useState(false);

  const onSubmit = () => {
    setLoading(true);
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
        toast.error(err?.response?.data ?? 'Something went wrong!');
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="h-screen px-12 pt-12 pb-4 flex flex-col justify-between items-center gap-4 text-xl font-semibold">
      <div className="relative">
        <div className="">
          <Image
            src={logo}
            alt="logo"
            style={{ height: '128px', objectFit: 'contain' }}
          />
        </div>
      </div>
      {inGame ? (
        <PlayerBoard
          username={username}
          playId={playId}
          setInGame={setInGame}
        />
      ) : (
        <div className="w-full flex flex-col justify-center items-center gap-4 text-lg font-semibold py-4">
          <div className="flex flex-col gap-1 items-center">
            <p>Enter Play ID</p>
            <div className="w-64">
              <Input
                type="text"
                value={playId}
                onChange={(e) => setPlayId(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-col gap-1 items-center">
            <p>Enter your name</p>
            <div className="w-64">
              <Input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>
          <ElevatedButton
            text="Join game"
            loading={loading}
            onClick={onSubmit}
            size="big"
            className="mt-8"
          />
        </div>
      )}
      <div className="flex flex-col items-center">
        <div className="font-light text-sm">Powered by </div>
        <div className="text-sm text-secondary">COFFEE</div>
      </div>
    </div>
  );
};

export default QuickPlay;
