'use client';

import {
  ArrowRightIcon,
  HandThumbDownIcon,
  HandThumbUpIcon,
  XCircleIcon,
  XMarkIcon,
} from '@heroicons/react/24/solid';
import { Message, Question, Session } from '@prisma/client';
import axios from 'axios';
import Image from 'next/image';
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import { Player } from '@/types';
import { toast } from 'react-hot-toast';

interface ModalProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  // onSubmit?: (event: FormEvent) => void;
  question?: Question;
  setInPlay: Dispatch<SetStateAction<boolean>>;
  players: Player[] | undefined;
  setPlayers: Dispatch<SetStateAction<Player[]>>;
  session: Session;
}

const PlayQuestionModal = ({
  open,
  setOpen,
  question,
  setInPlay,
  players,
  setPlayers,
  session,
}: ModalProps) => {
  const [showAnswer, setShowAnswer] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [evaluated, setEvaluated] = useState<boolean[]>(
    new Array(players?.length).fill(false)
  );

  useEffect(() => {
    console.log('evaluated', evaluated);
  }, [evaluated]);

  return (
    <div className={`${open ? '' : 'hidden'} relative z-10`}>
      <div className="fixed inset-0 bg-dark bg-opacity-75 transition-opacity"></div>

      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div
            className="relative w-[80vw] h-[80vh] p-2 transform overflow-hidden rounded-lg bg-secondary text-left 
          shadow-xl transition-all text-base"
          >
            {showAnswer ? (
              <div className="w-full h-full border-4 rounded-lg flex flex-col gap-8 justify-center items-center p-8 border-my-orange">
                <div className="text-5xl font-semibold">
                  {question?.answer}
                </div>
                {question?.answerImage && (
                  <div className="relative w-full h-full">
                    <Image
                      alt="answer image"
                      fill
                      style={{ objectFit: 'contain' }}
                      src={question?.answerImage}
                    />
                  </div>
                )}
                <div className="flex flex-row justify-between items-center gap-8 text-2xl font-semibold">
                  {players?.map((p, index) => (
                    <div
                      key={Math.random()}
                      className="flex flex-col justify-center items-center"
                    >
                      <div>{p.username}</div>
                      <div>
                        {messages.find(
                          (msg) => msg.username === p.username
                        )?.message || 'No answer'}
                      </div>
                      {!evaluated[index] && (
                        <div className="h-12 w-32 flex flex-row items-center justify-center gap-2 mt-4">
                          <HandThumbUpIcon
                            className="h-10 text-success border-2 rounded-lg p-1 border-success
                        cursor-pointer hover:h-12"
                            onClick={() => {
                              setPlayers((prev) => {
                                let temp = [...prev];
                                temp[index].points +=
                                  question?.points || 0;
                                return temp;
                              });
                              setEvaluated((prev) => {
                                let temp = [...prev];
                                temp[index] = true;
                                return temp;
                              });
                            }}
                          />
                          <HandThumbDownIcon
                            className="h-10 text-error border-2 rounded-lg p-1 border-error
                        cursor-pointer hover:h-12"
                            onClick={() => {
                              setEvaluated((prev) => {
                                let temp = [...prev];
                                temp[index] = true;
                                return temp;
                              });
                            }}
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <XMarkIcon
                  className="absolute right-6 top-6 h-8 cursor-pointer"
                  onClick={() => {
                    setInPlay(false);
                    setShowAnswer(false);
                    setOpen(false);
                    setMessages([]);
                    setEvaluated(
                      new Array(players?.length).fill(false)
                    );
                  }}
                />
              </div>
            ) : (
              <div className="w-full h-full border-4 rounded-lg flex flex-col gap-8 justify-center items-center p-8 border-my-orange">
                <div className="text-5xl font-semibold">
                  {question?.text}
                </div>
                {question?.questionImage && (
                  <div className="relative w-full h-full">
                    <Image
                      alt="question image"
                      fill
                      style={{ objectFit: 'contain' }}
                      src={question?.questionImage}
                    />
                  </div>
                )}
                <XMarkIcon
                  className="absolute right-6 top-6 h-8 cursor-pointer"
                  onClick={() => {
                    setInPlay(false);
                    setShowAnswer(false);
                    setOpen(false);
                    setMessages([]);
                    setEvaluated(
                      new Array(players?.length).fill(false)
                    );
                  }}
                />
                <div
                  className="absolute right-6 bottom-6 flex flex-row items-center text-xl gap-2 font-semibold cursor-pointer hover:font-bold"
                  onClick={() => {
                    setShowAnswer(true);
                    fetch(`/api/messages/?sessionId=${session.id}`)
                      .then((res) => res.json())
                      .then((data) => setMessages(data))
                      .catch((err) =>
                        toast.error(
                          err?.data?.response ||
                            "Couldn't fetch players' answers"
                        )
                      );
                  }}
                >
                  Answer
                  <ArrowRightIcon className="h-5" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayQuestionModal;
