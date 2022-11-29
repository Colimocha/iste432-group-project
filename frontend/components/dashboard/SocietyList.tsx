'use client';

import { getSocieties } from '#/lib/api/society';
import { Society } from '#/lib/model/Society';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import RemoveModal from '../RemoveModal';

export default function SocietyList() {
  const [societies, setSocieties] = useState<Society[]>([]);
  const path = usePathname();

  useEffect(() => {
    const token = sessionStorage.getItem('token') || '';
    getSocieties(token)
      .then((res) => setSocieties(res))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <table className="table-zebra table w-full">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th className="flex justify-end">Controls</th>
          </tr>
        </thead>
        <tbody>
          {societies.map((data: Society, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{data.name}</td>
              <td className="flex justify-end space-x-2">
                <Link
                  href={path + '/' + data.id}
                  className="btn-primary btn-sm btn"
                >
                  View/Edit
                </Link>
                <RemoveModal id={data.id} table={'society'} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
