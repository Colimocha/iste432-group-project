'use client';

import { getVoters } from '#/lib/api/voter';
import { Voter } from '#/lib/model/Voter';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import RemoveModal from '../RemoveModal';
import CreateModal from './CreateModal';

export default function VoterList() {
  const [voters, setVoters] = useState([]);
  const path = usePathname();

  useEffect(() => {
    const token = sessionStorage.getItem('token') || '';
    getVoters(token)
      .then((res) => setVoters(res))
      .catch((err) => console.log(err));
  }, []);

  return (
    <table className="table-zebra table w-full">
      <thead>
        <tr>
          <th>#</th>
          <th>Full Name</th>
          <th>Date Of Birth</th>
          <th>Society</th>
          <th>Created</th>
          <th className="flex items-center justify-end space-x-7">
            <CreateModal category="voter" />
            <label>Controls</label>
          </th>
        </tr>
      </thead>
      <tbody>
        {voters.length &&
          voters.map((data: Voter, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{data.firstName + ' ' + data.lastName}</td>
              <td>{data.dateOfBirth}</td>
              <td>{data.society.name}</td>
              <td>{data.createdAt.split('T')[0]}</td>
              <td className="flex justify-end space-x-2">
                <Link
                  href={path + '/' + data.id}
                  className="btn-primary btn-sm btn"
                >
                  View/Edit
                </Link>
                <RemoveModal id={data.id} table={'voter'} />
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}
