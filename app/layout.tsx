import '@/styles/globals.scss';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'BTM Registration',
  description: 'Apply for BTM Registrations',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="flex max-w-screen-md mx-auto min-h-screen flex-col p-24 gap-4 mobile:p-4 mobile:mt-8 tablet:p-6 tablet:mt-6">
          {children}
        </main>
      </body>
    </html>
  );
}
