'use client';

import Input from '@/components/input/Input';
import DialogModal from '@/components/modal/DialogModal';
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';
import { toast } from 'react-hot-toast';

export type ContextType = {
  username: string;
  setUsername: Dispatch<SetStateAction<string>>;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export const UserContext = createContext<ContextType>({
  username: '',
  setUsername: () => {},
  setOpen: () => {},
});

export const useUser = () => useContext(UserContext);

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [username, setUsername] = useState('');
  const [open, setOpen] = useState(false);
  const contextValue = {
    username,
    setUsername,
    setOpen,
  };

  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      let uname = localStorage.getItem('username');
      if (uname) {
        setUsername(uname);
      } else {
        setOpen(true);
      }
    }
  }, []);

  return (
    <UserContext.Provider value={contextValue}>
      {children}
      <DialogModal
        open={open}
        setOpen={setOpen}
        confirmText="Save"
        onSubmit={() => {
          if (!username) {
            toast.error('Your name cannot be empty');
            return;
          }

          if (typeof window !== 'undefined' && window.localStorage) {
            localStorage.setItem('username', username);
          }

          setOpen(false);
        }}
      >
        <div className="w-full flex flex-col justify-center items-center gap-4 text-xl font-semibold">
          <div className="">Enter your name</div>
          <div className="w-72">
            <Input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
        </div>
      </DialogModal>
    </UserContext.Provider>
  );
};

export default UserProvider;
