'use client';

import { editEmployee, getEmployee } from '#/lib/api/employee';
import { delay } from '#/lib/delay';
import { EditEmployee, Employee } from '#/lib/model/Employee';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface Params {
  employeeId: string;
}

const fields = [
  ['username', 'Username'],
  ['password', 'Password'],
];

const token = sessionStorage.getItem('token') || '';

export default function Page({ params }: { params: Params }) {
  const { employeeId } = params;
  const [data, setData] = useState<EditEmployee>({
    username: '',
    password: '',
  });
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    getEmployee(token, parseInt(employeeId))
      .then((res) => setData(res))
      .catch((err) => console.log(err));
  }, [employeeId]);
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
  };

  const handleEdit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    const data = new FormData(form);
    const object = Object.fromEntries(data.entries());

    //convert to EditEmployee
    const editEmployeeObject: EditEmployee = {
      username: object.username as string,
      password: object.password as string,
    };

    if (editEmployeeObject.password === '') {
      delete editEmployeeObject.password;
    }

    delay().then(() => {
      editEmployee(token, parseInt(employeeId), editEmployeeObject)
        .then(() => {
          setEdit(false);
        })
        .catch((err) => console.log(err))
        .finally(() => setLoading(false));
    });
  };

  return (
    <>
      <div className="flex justify-between">
        <button
          className="btn-primary btn-sm btn"
          onClick={() => router.back()}
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
          <form className="grid grid-cols-2 gap-4" onSubmit={handleEdit}>
            {fields.map(([key, label]) => (
              <div className="form-control rounded-md p-2 ring-2" key={key}>
                <label className="label">
                  <span className="label_text">{label}</span>
                </label>
                <input
                  type="text"
                  name={key}
                  placeholder={label}
                  className="input-bordered input w-full"
                  value={key === 'username' ? data.username : data.password}
                  onChange={handleInputChange}
                  disabled={!edit}
                />
              </div>
            ))}

            {edit && (
              <button
                className={clsx(
                  'btn-primary btn col-span-2 lg:col-span-1 lg:col-start-2',
                  {
                    loading: loading,
                  },
                )}
              >
                Save
              </button>
            )}
          </form>
        </div>
      </div>
    </>
  );
}
