'use client';

import { Question, Session } from '@prisma/client';
import { usePathname } from 'next/navigation';
import React, { Dispatch, SetStateAction } from 'react';
import { Player } from '@/types';
import EditQuestionCard from './EditQuestionCard';
import PlayQuestionCard from './PlayQuestionCard';

const QuestionCard = ({
  question,
  categoryId,
  session,
  players,
  setPlayers,
}: {
  question: Question;
  categoryId: string;
  session?: Session;
  players?: Player[];
  setPlayers?: Dispatch<SetStateAction<Player[]>>;
}) => {
  return (
    <>
      {session && players && setPlayers ? (
        <PlayQuestionCard
          question={question}
          categoryId={categoryId}
          session={session}
          players={players}
          setPlayers={setPlayers}
        />
      ) : (
        <EditQuestionCard question={question} />
      )}
    </>
  );
};

export default QuestionCard;
