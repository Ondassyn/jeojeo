'use client';

import {
  ArrowRightIcon,
  HandThumbDownIcon,
  HandThumbUpIcon,
  XCircleIcon,
} from '@heroicons/react/24/solid';
import { Message, Question, Session } from '@prisma/client';
import Image from 'next/image';
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import { Player } from '@/types';
import { toast } from 'react-hot-toast';
import ElevatedButton from '../button/ElevatedButton';
import Lottie from 'react-lottie-player';
import clock from '@/public/lotties/clock.json';
import AudioPlayer from '../audioPlayer/AudioPlayer';

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
  const [time, setTime] = useState(0);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (open) {
      interval = setInterval(() => {
        setTime((prev) => prev + 1000);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [open]);

  return (
    <div
      className={`${open ? '' : 'hidden'} relative z-20 shadow-2xl`}
    >
      <div className="fixed inset-0 bg-dark bg-opacity-75 transition-opacity"></div>

      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div
            className="relative w-[80vw] h-[80vh] p-4 transform overflow-hidden rounded-2xl bg-secondary text-left 
          shadow-xl"
          >
            {showAnswer ? (
              <div className="w-full h-full border-8 rounded-lg flex flex-col gap-8 justify-center items-center p-8">
                <div className="text-5xl font-semibold text-center">
                  {question?.answer}
                </div>
                {question?.answerImage && (
                  <div className="relative w-full h-full">
                    <Image
                      alt="answer image"
                      fill
                      style={{
                        objectFit: 'contain',
                      }}
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
                      <div className="text-xl text-yellow-200">
                        {p.username}
                      </div>
                      <div className="text-center">
                        {messages.find(
                          (msg) => msg.username === p.username
                        )?.message || 'No answer'}
                      </div>
                      {!evaluated[index] && (
                        <div className="h-12 w-32 flex flex-row items-center justify-center gap-2 mt-4">
                          <HandThumbUpIcon
                            className="h-10 text-primary border-2 rounded-lg p-1 border-primary
                        cursor-pointer hover:h-12 transition-all ease-out duration-200"
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
                            className="h-10 text-dark border-2 rounded-lg p-1 border-dark
                        cursor-pointer hover:h-12 transition-all ease-out duration-200"
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
                <XCircleIcon
                  className="absolute right-8 top-8 h-10 cursor-pointer
                  hover:h-12 transition-all ease-in-out duration-200"
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
              <div className="w-full h-full border-8 rounded-lg flex flex-col gap-8 justify-center items-center p-8">
                <div className="text-5xl font-semibold text-center">
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
                {question?.questionAudio && (
                  <div className="border-2 rounded-xl p-2">
                    <AudioPlayer
                      url={question?.questionAudio}
                      isAnimated
                    />
                  </div>
                )}
                <XCircleIcon
                  className="absolute right-8 top-8 h-10 cursor-pointer
                  hover:h-12 transition-all ease-in-out duration-200"
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

                <div className="absolute left-8 top-10 flex flex-col items-center gap-2">
                  <div className="h-10 w-10">
                    <Lottie animationData={clock} play loop />
                  </div>
                  <div className="text-lg">
                    <span>
                      {('0' + Math.floor((time / 60000) % 60)).slice(
                        -2
                      )}
                      :
                    </span>
                    <span>
                      {('0' + Math.floor((time / 1000) % 60)).slice(
                        -2
                      )}
                    </span>
                  </div>
                </div>
                <ElevatedButton
                  size="big"
                  className="absolute bottom-12 right-12"
                >
                  <div
                    className="flex flex-row items-center text-xl gap-2 font-semibold cursor-pointer hover:font-bold"
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
                </ElevatedButton>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayQuestionModal;
