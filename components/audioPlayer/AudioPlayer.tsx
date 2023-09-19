'use client';

import { PauseIcon, PlayIcon } from '@heroicons/react/24/solid';
import React, { useState, useEffect } from 'react';
import Lottie from 'react-lottie-player';
import equalizerWhite from '@/public/lotties/equalizer-white.json';

const useAudio = (url: string): [boolean, () => void] => {
  const [audio] = useState(new Audio(url));
  const [playing, setPlaying] = useState(false);

  const toggle = () => setPlaying(!playing);

  useEffect(() => {
    playing ? audio.play() : audio.pause();
  }, [playing, audio]);

  useEffect(() => {
    audio.addEventListener('ended', () => setPlaying(false));
    return () => {
      audio.removeEventListener('ended', () => setPlaying(false));
    };
  }, [audio]);

  return [playing, toggle];
};

const AudioPlayer = ({
  url,
  isAnimated,
}: {
  url: string;
  isAnimated?: boolean;
}) => {
  const [playing, toggle] = useAudio(url);

  return (
    <div className="flex flex-row items-center gap-2">
      {playing ? (
        <PauseIcon
          onClick={toggle}
          className={`${isAnimated ? 'h-10' : 'h-5'} cursor-pointer`}
        />
      ) : (
        <PlayIcon
          onClick={toggle}
          className={`${isAnimated ? 'h-10' : 'h-5'} cursor-pointer`}
        />
      )}
      {isAnimated ? (
        <div className="">
          <Lottie
            animationData={equalizerWhite}
            play={playing}
            loop
          />
        </div>
      ) : (
        <p className="truncate">
          {url.split('/')[url.split('/').length - 1]}
        </p>
      )}
    </div>
  );
};

export default AudioPlayer;
