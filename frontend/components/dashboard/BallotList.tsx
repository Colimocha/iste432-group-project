'use client';

import { getBallots } from '#/lib/api/ballot';
import { Ballot } from '#/lib/model/Ballot';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import RemoveModal from '../RemoveModal';

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
      <table className="table-zebra table w-full">
        <thead>
          <tr>
            <th>#</th>
            <th>Username</th>
            <th>Society</th>
            <th>Created</th>
            <th className="flex justify-end">Controls</th>
          </tr>
        </thead>
        <tbody>
          {ballots.map((data: Ballot, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{data.name}</td>
              <td>{data.societyId}</td>
              <td>{data.createdAt.split('T')[0]}</td>
              <td className="flex justify-end space-x-2">
                <Link
                  href={path + '/' + data.id}
                  className="btn-primary btn-sm btn"
                >
                  View/Edit
                </Link>
                <RemoveModal id={data.id} table={'ballot'} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
