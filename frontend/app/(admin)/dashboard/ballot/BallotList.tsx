'use client';

import { getBallots } from '#/lib/api/ballot';
import { Ballot } from '#/lib/model/Ballot';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function BallotList() {
  const [ballots, setBallots] = useState([]);
  const path = usePathname();

  useEffect(() => {
    const token = sessionStorage.getItem('token') || '';
    getBallots(token)
      .then((res) => setBallots(res))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <table className="table table-zebra w-full">
        <thead>
          <tr>
            <th>#</th>
            <th>Username</th>
            <th>Society</th>
            <th>Created</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {ballots.map((data: Ballot, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{data.name}</td>
              <td>{data.societyId}</td>
              <td>{data.createdAt.split('T')[0]}</td>
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
    </>
  );
}
