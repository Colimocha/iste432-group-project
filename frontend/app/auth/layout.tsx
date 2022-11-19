import Head from 'next/head';
import { ReactNode } from 'react';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <main className="flex flex-col items-center justify-center w-full text-center">
        {children}
      </main>
    </div>
  );
}
