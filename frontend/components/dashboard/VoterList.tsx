'use client';

import { getVoters } from '#/lib/api/voter';
import { Voter } from '#/lib/model/Voter';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

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
    <table className="table table-zebra w-full">
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Date Of Birth</th>
          <th>Controls</th>
        </tr>
      </thead>
      <tbody>
        {voters.length &&
          voters.map((voter: Voter, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>
                {voter.firstName} {voter.lastName}
              </td>
              <td>{voter.dateOfBirth}</td>
              <td className="space-x-2">
                <Link
                  href={path + '/' + voter.id}
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
