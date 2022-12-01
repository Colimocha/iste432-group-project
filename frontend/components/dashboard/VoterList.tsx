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
          <th>Name</th>
          <th>Date Of Birth</th>
          <th className="flex justify-end items-center space-x-6">
            {/* <Link
              href={''}
              className="btn btn-success btn-sm hover:bg-transparent"
            >
              Add
            </Link> */}
            <CreateModal />
            <label>Controls</label>
          </th>
        </tr>
      </thead>
      <tbody>
        {voters.length &&
          voters.map((data: Voter, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{data.firstName}</td>
              <td>{data.dateOfBirth}</td>
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
