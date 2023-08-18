'use client';

import {
  ArrowPathIcon,
  LockClosedIcon,
} from '@heroicons/react/24/solid';
import { Message, Session } from '@prisma/client';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { toast } from 'react-hot-toast';
import { Player } from '@/types';
import ElevatedButton from '../button/ElevatedButton';
import Lottie from 'react-lottie-player';

import spaceshipPurple from '@/public/lotties/spaceship_purple.json';
import spaceshipRed from '@/public/lotties/spaceship_red.json';
import spaceshipBlue from '@/public/lotties/spaceship_blue.json';
import spaceshipOrange from '@/public/lotties/spaceship_orange.json';
import spaceshipGreen from '@/public/lotties/spaceship_green.json';
import Image from 'next/image';

import splashOrange from '@/public/splash-orange.png';
import splashPurple from '@/public/splash-purple.png';
import splashBlue from '@/public/splash-blue.png';
import splashGreen from '@/public/splash-green.png';

const SPACESHIPS = [
  spaceshipPurple,
  spaceshipRed,
  spaceshipOrange,
  spaceshipGreen,
  spaceshipBlue,
];

const SPLASHES = [
  splashPurple,
  splashOrange,
  splashGreen,
  splashBlue,
];

const PlayersRow = ({
  session,
  players,
  setPlayers,
}: {
  session: Session | undefined;
  players: Player[];
  setPlayers: Dispatch<SetStateAction<Player[]>>;
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loadingRefresh, setLoadingRefresh] = useState(false);
  const [locked, setLocked] = useState(false);
  return (
    <div className="flex flex-row gap-8 items-center">
      {!locked && (
        <div className="flex flex-col gap-2">
          <ElevatedButton
            type="primary"
            onClick={() => {
              setLoadingRefresh(true);
              fetch(
                `/api/messages/?sessionId=${session?.id}&message=Hi2All`
              )
                .then((res) => res.json())
                .then((data) => {
                  setMessages(data);
                })
                .catch((err) => {
                  toast.error('Something went wrong!');
                })
                .finally(() => setLoadingRefresh(false));
            }}
            loading={loadingRefresh}
          >
            <div className="flex flex-row items-center justify-center gap-2 w-48">
              <ArrowPathIcon className="h-4" />
              <p>Refresh players</p>
            </div>
          </ElevatedButton>
          <ElevatedButton
            type="error"
            onClick={() => {
              setPlayers(
                messages.map((msg) => ({
                  username: msg.username,
                  points: 0,
                }))
              );
              setLocked(true);
            }}
          >
            <div className="flex flex-row items-center justify-center gap-2">
              <LockClosedIcon className="h-4 -mt-1" />
              <p>Lock players</p>
            </div>
          </ElevatedButton>
        </div>
      )}

      <div className="w-full flex flex-row justify-around">
        {locked
          ? players.map((player, index) => (
              <div
                key={Math.random()}
                className="flex flex-col justify-center items-center font-bold tracking-wide text-center"
              >
                <div className="flex flex-row justify-center items-center border p-1 w-24">
                  <p>{player.points}</p>
                </div>
                <div className="h-28 w-28 flex flex-col justify-center items-center">
                  <div className="z-10 ">{player.username}</div>

                  <Image
                    alt="planet"
                    src={SPLASHES[index % SPLASHES.length]}
                    style={{
                      height: '120px',
                      width: '120px',
                      position: 'absolute',
                      objectFit: 'cover',
                    }}
                  />
                </div>
              </div>
            ))
          : messages.map((msg, index) => (
              <div
                key={msg.id}
                className="text-white text-xl rounded-lg flex flex-row items-center justify-center 
               p-2"
              >
                <div className="w-24">
                  <Lottie
                    animationData={
                      SPACESHIPS[index % SPACESHIPS.length]
                    }
                    play
                    loop
                  />
                </div>
                <p className="font-bold">{msg?.username}</p>
              </div>
            ))}
      </div>
    </div>
  );
};

export default PlayersRow;
