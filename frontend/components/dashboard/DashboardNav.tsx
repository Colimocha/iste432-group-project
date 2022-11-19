'use client';

import {
  dashboardNavItems,
  type DashboardNavItem,
} from '#/lib/DashboardNavItem';
import clsx from 'clsx';
import Link from 'next/link';
import { useState } from 'react';
import { useSelectedLayoutSegment } from 'next/navigation';

export default function DashboardNav() {
  const [isOpen, setIsOpen] = useState(false);
  const close = () => setIsOpen(false);

  return (
    <div className="fixed top-0 z-10 flex w-full flex-col bg-white shadow-lg lg:bottom-0 lg:z-auto lg:m-4 lg:w-72 lg:rounded-lg lg:p-2">
      <div className="flex h-14 items-center py-4 px-4 lg:h-auto">
        <Link
          href="/dashboard"
          className="flex w-full items-center space-x-2.5 transition-all lg:h-16 lg:justify-center lg:rounded-lg lg:bg-blue-600 lg:shadow-lg lg:hover:bg-blue-500"
          onClick={close}
        >
          <h2 className="font-medium tracking-wide text-blue-600 lg:text-white">
            Dashboard
          </h2>
        </Link>
      </div>
      <button
        type="button"
        className="group absolute right-0 top-0 flex h-14 items-center space-x-2 px-4 lg:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="text-black-100 font-medium group-hover:text-gray-400">
          三
        </div>
        {isOpen ??
          {
            /** ICON */
          }}
      </button>

      <div
        className={clsx('overflow-y-auto lg:static lg:block', {
          'fixed inset-x-0 top-14 mt-px bg-white rounded-b-lg': isOpen,
          hidden: !isOpen,
        })}
      >
        <nav className="space-y-4 px-2 py-5">
          {dashboardNavItems.map((section) => {
            return (
              <div key={section.name}>
                <DashboardNavItem
                  key={section.slug}
                  item={section}
                  close={close}
                />
              </div>
            );
          })}
        </nav>
      </div>
    </div>
  );
}

function DashboardNavItem({
  item: { slug, name },
  close,
}: {
  item: DashboardNavItem;
  close: () => false | void;
}) {
  const segment = useSelectedLayoutSegment();
  const href = slug ? `/dashboard/${slug}` : '/dashboard';
  const isActive = (!slug && segment === null) || segment === slug;
  return (
    <Link
      onClick={close}
      href={href}
      className={clsx(
        'block rounded-md px-3 py-2 text-sm font-medium hover:text-gray-300',
        {
          'text-gray-500 hover:bg-gray-800': !isActive,
          'text-gray-200': isActive,
        },
      )}
    >
      {name}
    </Link>
  );
}
