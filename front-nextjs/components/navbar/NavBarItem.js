import Link from 'next/link'
import { useEffect, useState } from 'react'
import GlobalServices from '../../services/globalServices'

export default function NavBarItem() {
  const [role, setRole] = useState('')

  useEffect(() => {
    setRole(GlobalServices.getRole)
  }, [])

  const societyContactNavItems = (
    <>
      <Link href="/">
        {/* <a className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium"> */}
        <a className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
          Link 1
        </a>
      </Link>
      <Link href="/">
        <a className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
          Link 2
        </a>
      </Link>
      <Link href="/">
        <a className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
          Link 3
        </a>
      </Link>
    </>
  )

  const employeeNavItems = (
    <>
      <Link href="/">
        {/* <a className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium"> */}
        <a className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
          Link 1
        </a>
      </Link>

      <Link href="/">
        <a className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
          Link 2
        </a>
      </Link>
      <Link href="/">
        <a className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
          Link 3
        </a>
      </Link>
      <Link href="/">
        <a className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
          Link 4
        </a>
      </Link>
      <Link href="/">
        <a className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
          Link 5
        </a>
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
