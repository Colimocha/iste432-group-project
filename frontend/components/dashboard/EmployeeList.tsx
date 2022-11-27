'use client';

import { getEmployees } from '#/lib/api/employee';
import { Employee } from '#/lib/model/Employee';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

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
    <table className="table table-zebra w-full">
      <thead>
        <tr>
          <th>#</th>
          <th>Username</th>
          <th>Controls</th>
        </tr>
      </thead>
      <tbody>
        {employee.length &&
          employee.map((data: Employee, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{data.username}</td>
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
  );
}
