'use client';

import React from 'react';
import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from '@kinde-oss/kinde-auth-nextjs/server';
import { usePathname } from 'next/navigation';
import logo from '@/public/jeojeo-white.png';
import Image from 'next/image';
import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/solid';

const Navbar = ({ user, isAuthed }: { user: any; isAuthed: any }) => {
  const pathname = usePathname();
  if (pathname === '/') return <></>;
  else
    return (
      <header>
        {pathname !== '/quickplay' && (
          <nav className="absolute w-full h-[7vh] px-[2vw] flex flex-col justify-center items-center gap-4">
            <div className="w-full flex flex-row-reverse justify-between">
              {!isAuthed ? (
                <>
                  <LoginLink className="btn btn-ghost sign-in-btn">
                    Sign in
                  </LoginLink>
                  <RegisterLink className="btn btn-dark">
                    Sign up
                  </RegisterLink>
                </>
              ) : (
                <div className="w-full flex flex-row justify-between items-center">
                  <div className="relative h-6 w-20">
                    <Image
                      alt="JeoJeo"
                      src={logo}
                      fill
                      style={{ objectFit: 'contain' }}
                    />
                  </div>
                  <div className="flex flex-row items-center gap-8">
                    <div className="flex flex-row gap-2 items-center">
                      {user?.picture ? (
                        <img
                          className="avatar"
                          src={user?.picture}
                          alt="user profile avatar"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <div
                          className="h-8 w-8 flex flex-row items-center justify-center 
                          rounded-full bg-secondary font-bold"
                        >
                          {user?.given_name?.[0]}
                          {user?.family_name?.[0]}
                        </div>
                      )}

                      <p className="text-heading-2">
                        {user?.given_name} {user?.family_name}
                      </p>
                    </div>
                    <LogoutLink className="text-subtle">
                      <div className="flex flex-row gap-2 items-center">
                        <ArrowRightOnRectangleIcon className="h-7" />
                        <p>Log out</p>
                      </div>
                    </LogoutLink>
                  </div>
                </div>
              )}
            </div>
          </nav>
        )}
      </header>
    );
};

export default Navbar;
