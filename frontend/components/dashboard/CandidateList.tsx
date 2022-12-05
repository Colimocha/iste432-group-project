'use client';

import { getCandidates } from '#/lib/api/candidate';
import { Candidate } from '#/lib/model/Candidate';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import RemoveModal from '../RemoveModal';
import CreateModal from './CreateModal';

export default function CandidateList() {
  const [candidates, setCandidates] = useState([]);
  const path = usePathname();

  useEffect(() => {
    const token = sessionStorage.getItem('token') || '';
    getCandidates(token)
      .then((res) => setCandidates(res))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <table className="table-zebra table w-full">
        <thead>
          <tr>
            <th>#</th>
            <th>Full Name</th>
            <th>Title</th>
            <th>Office</th>
            <th>Ballot</th>
            <th>Created</th>
            <th className="flex items-center justify-end space-x-7">
              <CreateModal category="candidate" />
              <label>Controls</label>
            </th>
          </tr>
        </thead>
        <tbody>
          {candidates.length > 0 ? candidates.map((data: Candidate, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{[data.firstName, data.lastName].join(' ')}</td>
              <td>{data.title}</td>
              <td>{data.office.name}</td>
              <td>{data.ballot.name}</td>
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
          )) : <></>}
        </tbody>
      </table>
    </>
  );
}
