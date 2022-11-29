'use client';

import { useEffect, useState } from 'react';
import { EditSocietyContact } from '#/lib/model/SocietyContact';
import {
  editSocietyContact,
  getSocietyContact,
} from '#/lib/api/societyContact';
import clsx from 'clsx';

interface Params {
  scId: string;
}

export default function Page({ params }: { params: Params }) {
  const { scId } = params;
  const [edit, setEdit] = useState(false);
  const [data, setData] = useState<EditSocietyContact>({
    username: '',
    password: '',
    societyId: 0,
  });
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setToken(sessionStorage.getItem('token') || '');
    getSocietyContact(token, parseInt(scId))
      .then((res) => setData(res))
      .catch((err) => {});
  }, [scId, token]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = event.target;
    setData({ ...data, [name]: type === 'number' ? parseInt(value) : value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setLoading(true);
    editSocietyContact(token, Number(scId), data)
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

            <div className="form-control rounded-md p-2 ring-2">
              <label className="label">
                <span className="label_text">Password</span>
              </label>
              <input
                type="text"
                name="password"
                placeholder="Password"
                className="input-bordered input w-full"
                value={data?.password}
                onChange={handleInputChange}
                disabled={!edit}
              />
            </div>

            <div className="form-control rounded-md p-2 ring-2">
              <label className="label">
                <span className="label_text">Society</span>
              </label>
              <input
                type="number"
                placeholder="Society"
                name="societyId"
                className="input-bordered input w-full"
                value={data?.societyId}
                onChange={handleInputChange}
                disabled={!edit}
              />
            </div>

            {edit === true && (
              <button
                className={clsx('btn-primary btn col-start-2', {
                  loading: loading,
                })}
                onClick={handleSubmit}
              >
                Save
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
