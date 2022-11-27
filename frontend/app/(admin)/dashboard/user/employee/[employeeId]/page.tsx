'use client';

import { getEmployee } from '#/lib/api/employee';
import { Employee } from '#/lib/model/Employee';
import { useEffect, useState } from 'react';

interface Params {
  employeeId: string;
}

export default function Page({ params }: { params: Params }) {
  const { employeeId } = params;
  const [data, setData] = useState<Employee | null>(null);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem('token') || '';
    getEmployee(token, parseInt(employeeId))
      .then((res) => setData(res))
      .catch((err) => console.log(err));
  }, [employeeId]);

  return (
    <>
      <div className="flex justify-between">
        <button
          className="btn btn-primary btn-sm"
          onClick={() => history.back()}
        >
          Back
        </button>

        <label className="swap btn btn-outline btn-sm">
          <input
            type="checkbox"
            className="hidden"
            onChange={(e) => setEdit(e.target.checked)}
          />
          <div className="swap-on">Edit ON</div>
          <div className="swap-off">Edit OFF</div>
        </label>
      </div>
      <div className="w-full">
        <div className="mt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="form-control ring-2 p-2 rounded-md">
              <label className="label">
                <span className="label_text">Username</span>
              </label>
              <input
                type="text"
                placeholder="Username"
                className="input input-bordered w-full"
                value={data?.username}
                disabled={!edit}
              />
            </div>

            {edit === true && (
              <>
                <div className="form-control ring-2 p-2 rounded-md">
                  <label className="label">
                    <span className="label_text">Password</span>
                  </label>
                  <input
                    type="password"
                    placeholder="Password"
                    className="input input-bordered w-full"
                  />
                </div>
                <button className="btn btn-primary col-start-2">Save</button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
