import './globals.css';
import type { Metadata } from 'next';
import {
  Inter,
  Odibee_Sans,
  Fira_Sans,
  Roboto,
} from 'next/font/google';
import ToasterProvider from '@/contexts/ToasterProvider';
import Navbar from '@/components/navbar/Navbar';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

const inter = Inter({ subsets: ['latin'] });
const roboto = Roboto({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700', '900'],
});
const fira = Fira_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
});
const odibee = Odibee_Sans({
  weight: '400',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'JeoJeo',
  description: 'Play jeopardy with friends',
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
    <html lang="en" className="text-white overflow-y-hidden">
      <body
        className={`${inter.className} bg-gradient-to-br from-[#1B181F] to-[#320459]`}
      >
        <Navbar user={user} isAuthed={isAuthed} />
        <ToasterProvider />
        {children}
      </body>
    </html>
  );
}
