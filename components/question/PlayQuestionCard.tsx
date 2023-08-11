'use client';

import { COLORS } from '@/app/lib/constants/colors';
import { hashInRange } from '@/app/lib/util/hashInRange';
import { Question, Session } from '@prisma/client';
import axios from 'axios';
import React, {
  Dispatch,
  FormEvent,
  SetStateAction,
  useState,
} from 'react';
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
  players: Player[] | undefined;
  setPlayers: Dispatch<SetStateAction<Player[]>>;
}) => {
  const hash = hashInRange(categoryId, COLORS?.length);
  const [open, setOpen] = useState(false);
  const [answer, setAnswer] = useState(question?.answer);
  const [points, setPoints] = useState(question?.points);
  const [text, setText] = useState(question?.text);
  const [answerImage, setAnswerImage] = useState(
    question?.answerImage ?? undefined
  );
  const [questionImage, setQuestionImage] = useState(
    question?.questionImage ?? undefined
  );
  const [inPlay, setInPlay] = useState(
    question?.points ? true : false
  );

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    axios
      .patch(`/api/questions/${question?.id}`, {
        text,
        points,
        answer,
        answerImage,
        questionImage,
      })
      .then(() => {
        // router.refresh()
        // router.push('/')
        // reset()
        toast.success('Question has been changed!');
        setOpen(false);
      })

      .catch((err) => {
        throw new Error(err);
      })
      .finally(() => {
        // router.push('/')
      });
  };

  return (
    <>
      <div
        className="w-full h-full flex flex-col gap-4 justify-center items-center 
      rounded-xl text-xl cursor-pointer text-base"
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
