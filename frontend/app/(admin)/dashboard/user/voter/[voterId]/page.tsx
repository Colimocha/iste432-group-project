'use client';

import { editVoter, getVoter } from '#/lib/api/voter';
import { EditVoter } from '#/lib/model/Voter';
import clsx from 'clsx';
import { useEffect, useState } from 'react';

interface Params {
  voterId: string;
}

export default function Page({ params }: { params: Params }) {
  const { voterId } = params;
  const [data, setData] = useState<EditVoter>({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    credential_1: '',
    societyId: 0,
  });
  const [edit, setEdit] = useState(false);
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setToken(sessionStorage.getItem('token')!);
    getVoter(token, parseInt(voterId))
      .then((res) => setData(res))
      .catch((err) => console.log(err));
  }, [voterId, token]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setLoading(true);
    editVoter(token, Number(voterId), data)
      .then((res) => {
        setLoading(false);
        setEdit(false);
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
                <span className="label_text">First Name</span>
              </label>
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                className="input-bordered input w-full"
                value={data?.firstName}
                onChange={handleInputChange}
                disabled={!edit}
              />
            </div>

            <div className="form-control rounded-md p-2 ring-2">
              <label className="label">
                <span className="label_text">Last Name</span>
              </label>
              <input
                type="text"
                name="lastName"
                placeholder="First Name"
                className="input-bordered input w-full"
                value={data?.lastName}
                onChange={handleInputChange}
                disabled={!edit}
              />
            </div>

            <div className="form-control rounded-md p-2 ring-2">
              <label className="label">
                <span className="label_text">Date Of Birth</span>
              </label>
              <input
                type="text"
                name="dateOfBirth"
                placeholder="First Name"
                className="input-bordered input w-full"
                value={data?.dateOfBirth}
                onChange={handleInputChange}
                disabled={!edit}
              />
            </div>

            <div className="form-control rounded-md p-2 ring-2">
              <label className="label">
                <span className="label_text">Credential 1</span>
              </label>
              <input
                type="text"
                name="credential_1"
                placeholder="First Name"
                className="input-bordered input w-full"
                value={data?.credential_1}
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
