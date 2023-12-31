import getCategoriesByGameId from '@/app/actions/categories/getCategoriesByGameId';
import getGameById from '@/app/actions/games/getGameById';
import createSession from '@/app/actions/sessions/createSession';
import Game from '@/components/game/Game';
import GameHeader from '@/components/game/GameHeader';
import { notFound } from 'next/navigation';
// export const dynamicParams = false;

// export async function generateStaticParams() {
//   const req = await fetch(`${process.env.BASE_URL}/api/games`);

//   const games = await req.json();

//   return games.map((g: any) => ({ id: g.id }));
// }

const Page = async ({
  params,
}: {
  params: { id: string };
  searchParams: { username: string };
}) => {
  const game = await getGameById({ id: params.id });

  if (!game) {
    notFound();
  }
  const categories = await getCategoriesByGameId({
    gameId: game?.id,
  });

  const playId = Math.floor(Math.random() * 1000000).toString();
  const session = await createSession({
    playId,
    gameId: game?.id,
  });

  return (
    <section className="pt-[9vh] pb-8 h-screen px-10 flex flex-col gap-8">
      <GameHeader name={game?.name} playId={playId} />
      <Game categories={categories} session={session} />
    </section>
  );
};

export default Page;
