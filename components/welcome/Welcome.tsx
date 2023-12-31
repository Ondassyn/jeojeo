'use client';

import React, { useState } from 'react';
import Lottie from 'react-lottie-player';
import astronaut from '@/public/lotties/astronaut.json';
import Image from 'next/image';
import logo from '@/public/jeojeo-logo-wo-bg.png';
import redPlanet from '@/public/red_planet.png';
import ElevatedButton from '../button/ElevatedButton';
import { useRouter } from 'next/navigation';
import {
  LoginLink,
  RegisterLink,
} from '@kinde-oss/kinde-auth-nextjs/server';

const Welcome = () => {
  const router = useRouter();

  const [loadingJoin, setLoadingJoin] = useState(false);
  const [loadingSignup, setLoadingSignup] = useState(false);
  const [loadingLogin, setLoadingLogin] = useState(false);

  return (
    <div className="h-full w-full flex lg:flex-row flex-col items-center">
      <div className="lg:w-1/2 flex flex-col gap-16 justify-center py-12 lg:py-0">
        <div className="relative h-32">
          <Image
            src={logo}
            alt="JeoJeo Logo"
            fill
            style={{ objectFit: 'contain' }}
          />
        </div>
        <div className="flex flex-col gap-8 items-center">
          <ElevatedButton
            size="big"
            text={'Join'}
            onClick={() => {
              router.push('/quickplay');
              setLoadingJoin(true);
            }}
            loading={loadingJoin}
          />
          <RegisterLink>
            <ElevatedButton
              size="big"
              onClick={() => setLoadingSignup(true)}
              loading={loadingSignup}
            >
              Sign up
            </ElevatedButton>
          </RegisterLink>
          <LoginLink>
            <ElevatedButton
              size="big"
              onClick={() => setLoadingLogin(true)}
              loading={loadingLogin}
            >
              Sign in
            </ElevatedButton>
          </LoginLink>
        </div>
      </div>
      <div
        className="h-screen lg:w-1/2 rounded-l-[2rem] flex flex-col items-center
        "
      >
        <div className="w-2/3 hidden lg:block">
          <Lottie animationData={astronaut} play loop />
        </div>

        <div className="w-full relative">
          <Image
            src={redPlanet}
            alt="planet"
            style={{ width: '100%' }}
          />
        </div>
      </div>
    </div>
  );
};

export default Welcome;
