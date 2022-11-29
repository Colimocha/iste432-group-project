'use client';

import { editEmployee, getEmployee } from '#/lib/api/employee';
import { EditEmployee, Employee } from '#/lib/model/Employee';
import clsx from 'clsx';
import { useEffect, useState } from 'react';

interface Params {
  employeeId: string;
}

export default function Page({ params }: { params: Params }) {
  const { employeeId } = params;
  const [data, setData] = useState<EditEmployee>({
    username: '',
    password: '',
  });
  const [edit, setEdit] = useState(false);
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setToken(sessionStorage.getItem('token') || '');
    getEmployee(token, parseInt(employeeId))
      .then((res) => setData(res))
      .catch((err) => console.log(err));
  }, [employeeId, token]);
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setLoading(true);
    editEmployee(token, Number(employeeId), data)
      .then((res) => {
        setLoading(false);
        setEdit(false);
        setData({ ...data, password: '' });
      })
      .catch((err) => {});
  };
  return (
    <>
      <div className="flex justify-between">
        <button
          className="btn-primary btn-sm btn"
          onClick={() => history.back()}
        >
          Back
        </button>

        <label className="swap btn-outline btn-sm btn">
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
            <div className="form-control rounded-md p-2 ring-2">
              <label className="label">
                <span className="label_text">Username</span>
              </label>
              <input
                type="text"
                name="username"
                placeholder="Username"
                className="input-bordered input w-full"
                value={data?.username}
                onChange={handleInputChange}
                disabled={!edit}
              />
            </div>

            {edit === true && (
              <>
                <div className="form-control rounded-md p-2 ring-2">
                  <label className="label">
                    <span className="label_text">Password</span>
                  </label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="input-bordered input w-full"
                    value={data?.password}
                    onChange={handleInputChange}
                  />
                </div>
                <button
                  className={clsx('btn-primary btn col-start-2', {
                    loading: loading,
                  })}
                  onClick={handleSubmit}
                >
                  Save
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
