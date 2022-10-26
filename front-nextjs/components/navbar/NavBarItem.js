import Link from 'next/link'
import { useEffect, useState } from 'react'
import GlobalServices from '../../lib/global'

export default function NavBarItem() {
  const [role, setRole] = useState('')

  useEffect(() => {
    setRole(GlobalServices.getRole)
  }, [])

  const societyContactNavItems = (
    <>
      <Link
        href="/"
        className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
      >
        Link 1
      </Link>
      <Link
        href="/"
        className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
      >
        Link 2
      </Link>
      <Link
        href="/"
        className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
      >
        Link 3
      </Link>
    </>
  )

  const employeeNavItems = (
    <>
      <Link
        href="/"
        className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
      >
        Link 1
      </Link>

      <Link
        href="/"
        className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
      >
        Link 2
      </Link>
      <Link
        href="/"
        className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
      >
        Link 3
      </Link>
      <Link
        href="/"
        className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
      >
        Link 4
      </Link>
      <Link
        href="/"
        className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
      >
        Link 5
      </Link>
    </>
  )

  return (
    <>
      {role === 'societyContact' && societyContactNavItems}
      {role === 'employee' && employeeNavItems}
    </>
  )
}
