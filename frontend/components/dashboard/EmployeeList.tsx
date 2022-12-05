'use client';

import { getEmployees } from '#/lib/api/employee';
import { Employee } from '#/lib/model/Employee';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import RemoveModal from '../RemoveModal';
import CreateModal from './CreateModal';

export default function EmployeeList() {
  const [employee, setEmployee] = useState<Employee[]>([]);
  const path = usePathname();

  useEffect(() => {
    const token = sessionStorage.getItem('token') || '';
    getEmployees(token)
      .then((res) => setEmployee(res))
      .catch((err) => console.log(err));
  }, []);

  return (
    <table className="table-zebra table w-full">
      <thead>
        <tr>
          <th>#</th>
          <th>Username</th>
          <th>Created</th>
          <th className="flex items-center justify-end space-x-7">
            <CreateModal category="employee" />
            <label>Controls</label>
          </th>
        </tr>
      </thead>
      <tbody>
        {employee.length &&
          employee.map((data: Employee, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{data.username}</td>
              <td>{data.createdAt.split('T')[0]}</td>
              <td className="flex justify-end space-x-2">
                <Link
                  href={path + '/' + data.id}
                  className="btn-primary btn-sm btn"
                >
                  View/Edit
                </Link>
                <RemoveModal id={data.id} table={'employee'} />
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}
