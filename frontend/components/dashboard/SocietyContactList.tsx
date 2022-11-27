'use client';

import { getSocietyContacts } from '#/lib/api/societyContact';
import { getSocieties } from '#/lib/api/society';
import { SocietyContact } from '#/lib/model/SocietyContact';
import { Society } from '#/lib/model/Society';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function VoterList() {
  const [societyContacts, setSocietyContacts] = useState([]);
  const [societies, setSocieties] = useState([]);
  const path = usePathname();

  useEffect(() => {
    const token = sessionStorage.getItem('token') || '';
    getSocietyContacts(token)
      .then((res) => setSocietyContacts(res))
      .catch((err) => console.log(err));

    getSocieties(token)
      .then((res) => setSocieties(res))
      .catch((err) => console.log(err));
  }, []);

  return (
    <table className="table table-zebra w-full">
      <thead>
        <tr>
          <th>#</th>
          <th>Username</th>
          <th>Society</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {societyContacts.map((data: SocietyContact, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{data.username}</td>
            <td>
              {societies.map((society: Society) => {
                if (society.id == data.id) return society.name;
              })}
            </td>
            <td className="space-x-2">
              <Link
                href={path + '/' + data.id}
                className="btn btn-sm btn-primary"
              >
                View/Edit
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
