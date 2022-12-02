'use client';

import { getBallots } from '#/lib/api/ballot';
import { Ballot } from '#/lib/model/Ballot';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import RemoveModal from '../RemoveModal';
import CreateModal from './CreateModal';

const token = sessionStorage.getItem('token') || '';
const role = sessionStorage.getItem('role') || '';

export default function BallotList() {
  const [ballots, setBallots] = useState([]);
  const path = usePathname();

  useEffect(() => {
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
            <th>Ballot Name</th>
            <th>Society</th>
            <th>Votes</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Created</th>
            <th className="flex items-center justify-end space-x-7">
              {role === 'employee' && <CreateModal category="ballot" />}
              <label>Controls</label>
            </th>
          </tr>
        </thead>
        <tbody>
          {ballots.map((data: Ballot, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{data.name}</td>
              <td>{data.society.name}</td>
              <td>{data._count.Vote}</td>
              <td>{data.start_date ?? 'N/A'}</td>
              <td>{data.end_date ?? 'N/A'}</td>
              <td>{data.createdAt.split('T')[0]}</td>
              <td className="flex justify-end space-x-2">
                <Link
                  href={path + '/' + data.id}
                  className="btn-primary btn-sm btn"
                >
                  {role === 'employee' ? 'View/Edit' : 'Details'}
                </Link>
                {role === 'employee' && (
                  <RemoveModal id={data.id} table={'ballot'} />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
