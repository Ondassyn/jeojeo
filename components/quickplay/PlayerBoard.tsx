'use client';

import axios from 'axios';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { toast } from 'react-hot-toast';
import Button from '../button/Button';
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
    <div className="flex flex-col gap-4">
      <div className="w-96">
        <TextArea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="text-2xl"
        />
      </div>
      <Button
        loading={loading}
        type="primary"
        onClick={() => {
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
      </Button>
      {submitted && (
        <div className="flex flex-col justify-center items-center gap-4 text-white">
          <p className="text-lg">Submitted answer:</p>
          <p className="text-xl rounded-lg border-2 border-primary px-8 py-2">
            {submitted}
          </p>
        </div>
      )}
    </div>
  );
};

export default PlayerBoard;
