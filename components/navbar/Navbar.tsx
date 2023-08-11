'use client';

import React from 'react';
import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from '@kinde-oss/kinde-auth-nextjs/server';
import { usePathname } from 'next/navigation';

const Navbar = ({ user, isAuthed }: { user: any; isAuthed: any }) => {
  const pathname = usePathname();
  return (
    <header>
      {pathname !== '/quickplay' && (
        <nav className="absolute w-full h-[7vh] px-[2vw] flex flex-col justify-center items-center gap-4">
          <div className="w-full flex flex-row-reverse justify-between text-white">
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
                <div className="flex flex-row items-center gap-2">
                  {user?.picture ? (
                    <img
                      className="avatar"
                      src={user?.picture}
                      alt="user profile avatar"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="rounded-full bg-secondary p-2 font-bold">
                      {user?.given_name?.[0]}
                      {user?.family_name?.[0]}
                    </div>
                  )}

                  <p className="text-heading-2">
                    {user?.given_name} {user?.family_name}
                  </p>
                </div>
                <LogoutLink className="text-subtle">
                  Log out
                </LogoutLink>
              </div>
            )}
          </div>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
