import { Avatar, Icon } from '@mui/material'
import Link from 'next/link'
import NavBarItem from './NavBarItem'

export default function NavBar() {
  return (
    <>
      <nav className="bg-gray-800">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              {/* Logo */}
              <div className="flex flex-shrink-0 items-center text-white">
                <Avatar alt="Logo" src="/favicon.ico" />
              </div>

              {/* Links (Router) */}
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4">
                  <NavBarItem />
                </div>
              </div>
            </div>

            {/* Dropdown Avatar */}
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <div className="relative ml-3 text-white">
                <Avatar />
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}
