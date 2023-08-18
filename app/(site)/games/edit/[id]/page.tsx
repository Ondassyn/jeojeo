import getCategoriesByGameId from '@/app/actions/categories/getCategoriesByGameId';
import getGameById from '@/app/actions/games/getGameById';
import CategoryColumn from '@/components/category/CategoryColumn';
import Create from '@/components/category/Create';
import GameHeader from '@/components/game/GameHeader';
import { notFound } from 'next/navigation';

// export const dynamicParams = false;

// export async function generateStaticParams() {
//   const req = await fetch(`${process.env.BASE_URL}/api/games`);

//   const games = await req.json();

//   return games.map((g: any) => ({ id: g.id }));
// }

const Page = async ({ params }: { params: any }) => {
  const game = await getGameById({ id: params.id });
  let categories = await getCategoriesByGameId({
    gameId: game?.id,
  });

  if (!game) {
    notFound();
  }

  return (
    <section className="pt-[9vh] pb-8 h-screen px-10 flex flex-col gap-8">
      <GameHeader name={game.name} />
      <div className="flex flex-row gap-8 h-full">
        {categories.map((category) => (
          <CategoryColumn key={category?.id} category={category} />
        ))}
        <Create
          gameId={game?.id}
          questionsPerCategory={game?.questionsPerCategory}
        />
      </div>
    </section>
  );
};

export default Page;
