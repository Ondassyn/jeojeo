'use client';

import { Player } from '@/types';
import { Category, Session } from '@prisma/client';
import React, { useState } from 'react';
import CategoryColumn from '../category/CategoryColumn';
import PlayersRow from './PlayersRow';

const Game = ({
  categories,
  session,
}: {
  categories: Category[];
  session?: Session;
}) => {
  const [players, setPlayers] = useState<Player[]>([]);
  return (
    <div className="h-full flex flex-col gap-8">
      <div className="flex flex-row gap-8 h-full">
        {categories.map((category) => (
          <CategoryColumn
            key={category?.id}
            category={category}
            session={session}
            players={players}
            setPlayers={setPlayers}
          />
        ))}
      </div>
      <PlayersRow
        session={session}
        players={players}
        setPlayers={setPlayers}
      />
    </div>
  );
};

export default Game;
