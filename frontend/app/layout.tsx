import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { ChatBot } from '@/components/ChatBot';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Uppskillr - Learn Programming Online',
  description: 'Master programming with our comprehensive courses in Python, Data Structures, Web Development and more.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <main className="min-h-screen bg-gradient-to-b from-white via-pink-50/30 to-white">
          {children}
          <ChatBot />
        </main>
      </body>
    </html>
  );
}
