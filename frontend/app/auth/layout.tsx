import Head from 'next/head';
import { ReactNode } from 'react';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center text-center">
      <main className="flex w-full flex-col items-center justify-center text-center">
        {children}
      </main>
    </div>
  );
}
