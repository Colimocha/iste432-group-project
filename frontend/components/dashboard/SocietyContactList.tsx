'use client';

import { getSocietyContacts } from '#/lib/api/societyContact';
import { getSocieties } from '#/lib/api/society';
import { SocietyContact } from '#/lib/model/SocietyContact';
import { Society } from '#/lib/model/Society';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import RemoveModal from '../RemoveModal';

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
    <table className="table-zebra table w-full">
      <thead>
        <tr>
          <th>#</th>
          <th>Username</th>
          <th>Society</th>
          <th className="flex justify-end">Controls</th>
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
            <td className="flex justify-end space-x-2">
              <Link
                href={path + '/' + data.id}
                className="btn-primary btn-sm btn"
              >
                View/Edit
              </Link>
              <RemoveModal id={data.id} table={'societyContact'} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
