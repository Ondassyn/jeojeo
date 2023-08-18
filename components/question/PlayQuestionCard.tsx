'use client';

import { COLORS } from '@/app/lib/constants/colors';
import { hashInRange } from '@/app/lib/util/hashInRange';
import { Question, Session } from '@prisma/client';
import axios from 'axios';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { toast } from 'react-hot-toast';
import { Player } from '@/types';
import PlayQuestionModal from './PlayQuestionModal';

const PlayQuestionCard = ({
  question,
  categoryId,
  session,
  players,
  setPlayers,
}: {
  question: Question;
  categoryId: string;
  session: Session;
  players: Player[];
  setPlayers: Dispatch<SetStateAction<Player[]>>;
}) => {
  const hash = hashInRange(categoryId, COLORS?.length);
  const [open, setOpen] = useState(false);

  const [inPlay, setInPlay] = useState(
    question?.points ? true : false
  );

  return (
    <>
      <div
        className="w-full h-full flex flex-col gap-4 justify-center items-center 
      rounded-xl text-xl cursor-pointer text-dark hover:scale-110 transition ease-in-out duration-200
        shadow-lg"
        style={{
          backgroundColor: COLORS[hash]?.dark,
          opacity: inPlay ? 1 : 0.2,
        }}
        onClick={() => {
          if (inPlay) {
            setOpen(true);
            axios
              .delete('/api/messages', {
                data: { sessionId: session.id },
              })
              .catch((err) => {
                toast.error(
                  err?.response?.data || 'Something went wrong!'
                );
              });
          }
        }}
      >
        <div className="text-3xl font-bold">
          {question?.points ?? '-'}
        </div>
      </div>
      <PlayQuestionModal
        open={open}
        setOpen={setOpen}
        question={question}
        setInPlay={setInPlay}
        players={players}
        setPlayers={setPlayers}
        session={session}
      />
    </>
  );
};

export default PlayQuestionCard;
