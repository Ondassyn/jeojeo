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
  TrashIcon,
  WrenchIcon,
} from '@heroicons/react/24/solid';
import { Game } from '@prisma/client';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';

const GameCard = ({ game }: { game: Game }) => {
  const router = useRouter();
  const { username } = useUser();
  const hash = hashInRange(game?.id, COLORS?.length);
  const iconHash = hashInRange(game?.id, ICONS?.length);
  const [loadingEdit, setLoadingEdit] = useState(false);
  const [loadingPlay, setLoadingPlay] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  return (
    <div
      style={{
        backgroundColor: COLORS[hash]?.dark,
      }}
      className="relative w-64 h-48 rounded-xl cursor-pointer pt-8 flex 
        flex-col justify-between items-center text-center overflow-hidden 
        text-dark font-semibold shadow-xl 
        hover:scale-110 transition ease-in-out duration-200"
    >
      {ICONS[iconHash]}
      <h1 className="z-10 text-3xl font-bold tracking-wide">
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
          className="flex flex-row gap-1 items-center hover:font-extrabold"
          onClick={() => setLoadingPlay(true)}
        >
          <div
            className="p-2 rounded-md"
            style={{ backgroundColor: COLORS[hash]?.light }}
          >
            {loadingPlay ? (
              <svg
                role="status"
                className="m-auto w-4 h-4 animate-spin"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="#E5E7EB"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentColor"
                />
              </svg>
            ) : (
              <PlayIcon className="h-4" />
            )}
          </div>
          <p>Play</p>
        </Link>
        <div
          onClick={() => {
            setLoadingEdit(true);
            router.push(`/games/edit/${game?.id}`);
          }}
          className="flex flex-row gap-2 items-center hover:font-extrabold"
        >
          <div
            className="p-2 rounded-md"
            style={{ backgroundColor: COLORS[hash]?.light }}
          >
            {loadingEdit ? (
              <svg
                role="status"
                className="m-auto w-4 h-4 animate-spin"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="#E5E7EB"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentColor"
                />
              </svg>
            ) : (
              <WrenchIcon className="h-4" />
            )}
          </div>
          <p>Edit</p>
        </div>
        <div
          className="p-2 rounded-md"
          style={{ backgroundColor: COLORS[hash]?.light }}
          onClick={() => {
            setLoadingDelete(true);
            axios
              .delete(`/api/games/${game.id}`)
              .then((res) => {
                toast.success(`${res.data.name} has been deleted!`);
                router.refresh();
              })

              .catch((err) => {
                toast.error(err?.message ?? 'Something went wrong!');
              })
              .finally(() => setLoadingDelete(false));
          }}
        >
          {loadingDelete ? (
            <svg
              role="status"
              className="m-auto w-5 h-5 text-error animate-spin"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="#E5E7EB"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentColor"
              />
            </svg>
          ) : (
            <TrashIcon className="h-5 text-error" />
          )}
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
