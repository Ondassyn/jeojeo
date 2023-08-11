'use client';

import { COLORS } from '@/app/lib/constants/colors';
import { hashInRange } from '@/app/lib/util/hashInRange';
import { useUser } from '@/contexts/UserProvider';
import {
  AcademicCapIcon,
  ArrowRightCircleIcon,
  BeakerIcon,
  BoltIcon,
  BugAntIcon,
  FilmIcon,
  PlayIcon,
  StarIcon,
  WrenchIcon,
} from '@heroicons/react/24/solid';
import { Game } from '@prisma/client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';

const GameCard = ({ game }: { game: Game }) => {
  const router = useRouter();
  const { username } = useUser();
  const hash = hashInRange(game?.id, COLORS?.length);
  const iconHash = hashInRange(game?.id, ICONS?.length);
  return (
    <div
      style={{
        backgroundColor: COLORS[hash]?.dark,
      }}
      className="relative w-64 h-48 rounded-xl cursor-pointer pt-8 flex flex-col justify-between items-center overflow-hidden text-base"
    >
      {ICONS[iconHash]}
      <h1 className="z-10 text-xl font-bold tracking-wide">
        {game?.name}
      </h1>
      <div
        className="z-10 w-full flex flex-row justify-between p-4"
        style={{ backgroundColor: COLORS[hash]?.dark }}
      >
        <Link
          href={{
            pathname: `/games/play/${game?.id}`,
            query: { username },
          }}
          className="flex flex-row gap-1 items-center hover:font-semibold"
        >
          <div
            className="p-2 rounded-md"
            style={{ backgroundColor: COLORS[hash]?.light }}
          >
            <PlayIcon className="h-4" />
          </div>
          <p>Play</p>
        </Link>
        <div
          onClick={() => {
            router.push(`/games/edit/${game?.id}`);
          }}
          className="flex flex-row gap-2 items-center hover:font-semibold"
        >
          <div
            className="p-2 rounded-md"
            style={{ backgroundColor: COLORS[hash]?.light }}
          >
            <WrenchIcon className="h-4" />
          </div>
          <p>Edit</p>
        </div>
      </div>
    </div>
  );
};

const ICONS = [
  <StarIcon
    key="0"
    className="h-64 absolute text-white text-opacity-40 -top-14 -left-14"
  />,
  <AcademicCapIcon
    key="1"
    className="h-64 absolute text-white text-opacity-40 -top-14 -left-14"
  />,
  <ArrowRightCircleIcon
    key="1"
    className="h-64 absolute text-white text-opacity-40 -top-14 -left-14"
  />,
  <BeakerIcon
    key="1"
    className="h-64 absolute text-white text-opacity-40 -top-14 -left-14"
  />,
  <BoltIcon
    key="1"
    className="h-64 absolute text-white text-opacity-40 -top-14 -left-14"
  />,
  <BugAntIcon
    key="1"
    className="h-64 absolute text-white text-opacity-40 -top-14 -left-14"
  />,
  <FilmIcon
    key="1"
    className="h-64 absolute text-white text-opacity-40 -top-14 -left-14"
  />,
];

export default GameCard;
