'use client';

import { Question } from '@prisma/client';
import axios from 'axios';
import React, { FormEvent, useState } from 'react';
import { toast } from 'react-hot-toast';
import AudioUpload from '../input/AudioUpload';
import ImageUpload from '../input/ImageUpload';
import Input from '../input/Input';
import TextArea from '../input/TextArea';
import Modal from '../modal/Modal';
import Toggle from '../toggle/Toggle';

const EditQuestionCard = ({ question }: { question: Question }) => {
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
  const [questionAudio, setQuestionAudio] = useState(
    question?.questionAudio ?? undefined
  );
  const [hasQuestionImage, setHasQuestionImage] = useState(
    !!question?.questionImage
  );
  const [hasQuestionAudio, setHasQuestionAudio] = useState(
    !!question?.questionAudio
  );
  const [hasAnswerImage, setHasAnswerImage] = useState(
    !!question?.answerImage
  );
  const [loading, setLoading] = useState(false);

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    axios
      .patch(`/api/questions/${question?.id}`, {
        text,
        points,
        answer,
        answerImage,
        questionImage,
        questionAudio,
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
        setLoading(false);
      });
  };

  return (
    <>
      <div
        className="w-full h-full bg-purple-800 flex flex-col gap-4 justify-center items-center 
      rounded-xl text-xl cursor-pointer shadow-lg hover:scale-110 transition ease-in-out duration-200 text-center
      "
        onClick={() => setOpen(true)}
      >
        <div className="w-full px-4">
          <span className="block truncate">{`Answer: ${
            answer ?? '-'
          }`}</span>
        </div>
        <div className="w-full px-4">
          <span className="block truncate">{`Points: ${
            points ?? '-'
          }`}</span>
        </div>
      </div>
      <Modal
        open={open}
        setOpen={setOpen}
        confirmText="Save"
        onSubmit={onSubmit}
        loading={loading}
      >
        <div className="flex flex-col gap-4 w-full p-2">
          <div className="flex flex-col gap-2 text-dark">
            <p>Question text</p>
            <TextArea
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2 text-dark">
            <div className="flex flex-row gap-4 items-center">
              <p>Question image</p>
              <Toggle
                value={hasQuestionImage}
                onClick={() => {
                  if (hasQuestionImage) {
                    setHasQuestionImage(false);
                    setQuestionImage(undefined);
                  } else {
                    setHasQuestionImage(true);
                  }
                }}
              />
            </div>
            {hasQuestionImage && (
              <ImageUpload
                value={questionImage}
                onChange={(val) => setQuestionImage(val)}
              />
            )}
          </div>
          <div className="flex flex-col gap-2 text-dark">
            <div className="flex flex-row gap-4 items-center">
              <p>Question audio</p>
              <Toggle
                value={hasQuestionAudio}
                onClick={() => {
                  if (hasQuestionAudio) {
                    setHasQuestionAudio(false);
                    setQuestionAudio(undefined);
                  } else {
                    setHasQuestionAudio(true);
                  }
                }}
              />
            </div>
            {hasQuestionAudio && (
              <AudioUpload
                value={questionAudio}
                onChange={(val) => setQuestionAudio(val)}
              />
            )}
          </div>
          <div className="flex flex-col gap-2 text-dark">
            <p>Answer</p>
            <Input
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              type="text"
            />
          </div>
          <div className="flex flex-col gap-2 text-dark">
            <div className="flex flex-row gap-4 items-center">
              <p>Answer image</p>
              <Toggle
                value={hasAnswerImage}
                onClick={() => {
                  if (hasAnswerImage) {
                    setHasAnswerImage(false);
                    setAnswerImage(undefined);
                  } else {
                    setHasAnswerImage(true);
                  }
                }}
              />
            </div>
            {hasAnswerImage && (
              <ImageUpload
                value={answerImage}
                onChange={(val) => setAnswerImage(val)}
              />
            )}
          </div>
          <div className="flex flex-col gap-2 text-dark">
            <p>Points</p>
            <Input
              value={points}
              onChange={(e) =>
                setPoints(
                  !Number.isNaN(e.target.valueAsNumber)
                    ? e.target.valueAsNumber
                    : null
                )
              }
              type="number"
            />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default EditQuestionCard;
