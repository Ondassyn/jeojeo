'use client';

import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/navigation';
import React from 'react';
import ElevatedButton from '../button/ElevatedButton';

const GameHeader = ({
  name,
  playId,
}: {
  name: string;
  playId?: string;
}) => {
  const router = useRouter();

  return (
    <div className="w-full flex flex-row justify-between items-center cursor-pointer">
      <div
        className="flex flex-row gap-4 items-center text-lg font-semibold hover:scale-105 transition ease-in-out duration-200"
        onClick={router.back}
      >
        <ArrowLeftIcon className="h-5" />
        Games
      </div>
      <p className="text-2xl font-semibold tracking-wider">{name}</p>
      {playId ? (
        <div className="flex flex-row items-center gap-2">
          <div className="font-medium text-lg">{`Play ID: ${playId}`}</div>
          <ElevatedButton
            text="Reset game"
            onClick={() => window.location.reload()}
          />
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default GameHeader;
