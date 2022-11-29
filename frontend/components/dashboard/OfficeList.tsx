'use client';

import { getOffices } from '#/lib/api/office';
import { Office } from '#/lib/model/Office';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import RemoveModal from '../RemoveModal';

export default function OfficeList() {
  const [offices, setOffices] = useState([]);
  const path = usePathname();

  useEffect(() => {
    const token = sessionStorage.getItem('token') || '';
    getOffices(token)
      .then((res) => setOffices(res))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <table className="table-zebra table w-full">
        <thead>
          <tr>
            <th>#</th>
            <th>Username</th>
            <th>Ballot</th>
            <th>Created</th>
            <th className="flex justify-end">Controls</th>
          </tr>
        </thead>
        <tbody>
          {offices.map((data: Office, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{data.name}</td>
              <td>{data.ballotId}</td>
              <td>{data.createdAt.split('T')[0]}</td>
              <td className="flex justify-end space-x-2">
                <Link
                  href={path + '/' + data.id}
                  className="btn-primary btn-sm btn"
                >
                  View/Edit
                </Link>
                <RemoveModal id={data.id} table={'office'} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
