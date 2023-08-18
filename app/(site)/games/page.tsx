import getGamesByUserId from '@/app/actions/games/getGamesByUserId';
import Create from '@/components/game/Create';
import GameCard from '@/components/game/GameCard';
import React from 'react';

const page = async () => {
  const games = await getGamesByUserId();

  return (
    <div className="h-screen pt-[9vh] px-10">
      <div className="flex flex-row flex-wrap gap-8">
        {games.map((item: any) => (
          <GameCard key={item?.id} game={item} />
        ))}
        <Create />
      </div>
    </div>
  );
};

export default page;
