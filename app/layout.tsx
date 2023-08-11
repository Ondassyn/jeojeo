import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import ToasterProvider from '@/contexts/ToasterProvider';
import UserProvider from '@/contexts/UserProvider';
import Navbar from '@/components/navbar/Navbar';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'JeoJeo',
  description: 'Jeopardy for fun',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, getUser } = getKindeServerSession();
  const user = getUser();
  const isAuthed = isAuthenticated();

  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar user={user} isAuthed={isAuthed} />
        <ToasterProvider />
        {children}
      </body>
    </html>
  );
}
