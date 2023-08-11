'use client';

import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/navigation';
import React from 'react';

const GameHeader = ({
  name,
  playId,
}: {
  name: string;
  playId?: string;
}) => {
  const router = useRouter();

  return (
    <div className="w-full flex flex-row justify-between items-center cursor-pointer text-white">
      <div
        className="flex flex-row gap-4 items-center"
        onClick={router.back}
      >
        <ArrowLeftIcon className="h-5" />
        Games
      </div>
      <p className="text-2xl font-semibold tracking-wider">{name}</p>
      {playId ? (
        <div className="flex flex-row items-center gap-2">
          <div className="font-medium text-lg">{`Play ID: ${playId}`}</div>
          <button
            className="bg-primary px-2 py-1 rounded-lg"
            onClick={() => window.location.reload()}
          >
            Reset game
          </button>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default GameHeader;
