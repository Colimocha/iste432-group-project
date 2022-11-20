'use client';

import type { Item } from '#/components/TabGroup';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname, useSelectedLayoutSegment } from 'next/navigation';

export const Tab = ({
  path,
  item: { slug, text },
}: {
  path: string;
  item: Item;
}) => {
  const segment = usePathname()?.split('/').slice(-1).toString();
  const href = slug ? path + '/' + slug : path;
  const isActive =
    // Example home pages e.g. `/layouts`
    (!slug && segment === null) ||
    // Nested pages e.g. `/layouts/electronics`
    segment === slug;

  return (
    <Link
      href={href}
      className={clsx('mt-2 mr-2 rounded-lg px-3 py-1 text-sm font-medium', {
        'bg-blue-500 text-white hover:bg-blue-300': !isActive,
        'bg-vercel-blue text-white': isActive,
      })}
    >
      {text}
    </Link>
  );
};
