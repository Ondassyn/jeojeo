'use client';

import axios from 'axios';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { toast } from 'react-hot-toast';
import ElevatedButton from '../button/ElevatedButton';
import TextArea from '../input/TextArea';

const PlayerBoard = ({
  username,
  playId,
  setInGame,
}: {
  username: string;
  playId: string;
  setInGame: Dispatch<SetStateAction<boolean>>;
}) => {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState('');
  return (
    <div className="w-full md:w-96 px-8 flex flex-col items-center gap-4">
      <div className="w-96">
        <TextArea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="text-2xl"
          placeholder="Enter your answer (40 characters max)"
          maxLength={40}
        />
      </div>
      <div className="w-full md:w-96">
        <ElevatedButton
          loading={loading}
          type="primary"
          onClick={() => {
            if (!message) {
              toast.error('Answer cannot be empty');
              return;
            }
            setLoading(true);
            axios
              .post('api/messages/', { username, playId, message })
              .then(() => {
                setSubmitted(message);
                toast.success('Your answer has been submitted');
                setMessage('');
              })
              .catch((err) => {
                toast.error(
                  err?.response?.data || 'Something went wrong!'
                );
                setInGame(false);
              })
              .finally(() => setLoading(false));
          }}
        >
          Submit
        </ElevatedButton>
      </div>
      {submitted && (
        <div className="flex flex-col justify-center items-center gap-4 text-white">
          <p className="text-lg">Last submitted answer:</p>
          <p className="text-xl rounded-lg border-2 border-primary px-8 py-2 text-center">
            {submitted}
          </p>
        </div>
      )}
    </div>
  );
};

export default PlayerBoard;
