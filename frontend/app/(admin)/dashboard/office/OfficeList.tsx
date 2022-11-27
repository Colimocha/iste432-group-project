'use client';

import { getOffices } from '#/lib/api/office';
import { Office } from '#/lib/model/Office';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

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
      <table className="table table-zebra w-full">
        <thead>
          <tr>
            <th>#</th>
            <th>Username</th>
            <th>Ballot</th>
            <th>Created</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {offices.map((data: Office, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{data.name}</td>
              <td>{data.ballotId}</td>
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
