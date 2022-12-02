'use client';

import { getSocietyContacts } from '#/lib/api/societyContact';
import { SocietyContact } from '#/lib/model/SocietyContact';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import RemoveModal from '../RemoveModal';
import CreateModal from './CreateModal';

export default function VoterList() {
  const [societyContacts, setSocietyContacts] = useState([]);
  const path = usePathname();

  useEffect(() => {
    const token = sessionStorage.getItem('token') || '';
    getSocietyContacts(token)
      .then((res) => setSocietyContacts(res))
      .catch((err) => console.log(err));
  }, []);

  return (
    <table className="table-zebra table w-full">
      <thead>
        <tr>
          <th>#</th>
          <th>Username</th>
          <th>Society</th>
          <th>Created</th>
          <th className="flex items-center justify-end space-x-7">
            <CreateModal category="societyContact" />
            <label>Controls</label>
          </th>
        </tr>
      </thead>
      <tbody>
        {societyContacts.map((data: SocietyContact, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{data.username}</td>
            <td>{data.society.name}</td>
            <td>{data.createdAt.split('T')[0]}</td>
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
