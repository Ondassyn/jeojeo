'use client';

import {
  ArrowPathIcon,
  LockClosedIcon,
} from '@heroicons/react/24/solid';
import { Message, Session } from '@prisma/client';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { toast } from 'react-hot-toast';
import Button from '../button/Button';
import { Player } from '@/types';

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
        <div className="flex flex-col gap-1">
          <Button
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
            <div className="flex flex-row items-center justify-center gap-2">
              <ArrowPathIcon className="h-4" />
              <p>Refresh players</p>
            </div>
          </Button>
          <Button
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
          </Button>
        </div>
      )}

      {locked
        ? players.map((player) => (
            <div
              key={Math.random()}
              className="flex flex-col justify-center items-center text-white"
            >
              <p>{player.username}</p>
              <p>{player.points}</p>
            </div>
          ))
        : messages.map((msg) => (
            <div
              key={msg.id}
              className="text-white text-xl rounded-lg flex flex-row gap-2 items-center justify-center 
              bg-secondary p-2"
            >
              <p>{msg?.username}</p>
            </div>
          ))}
    </div>
  );
};

export default PlayersRow;
