'use client';

import { useRouter } from 'next/navigation';
import { ReactNode, useEffect, useState } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [role, setRole] = useState('');

  useEffect(() => {
    const role = sessionStorage.getItem('role');
    setRole(role!);
  }, []);

  const allowedRoles = ['society_contact', 'employee'];

  switch (role) {
    case null:
      router.push('/auth');
      break;
    case 'voter':
      router.push('/vote');
      break;
    default:
      break;
  }

  if (allowedRoles.includes(role!)) return <>{children}</>;
  else return <></>;
}
