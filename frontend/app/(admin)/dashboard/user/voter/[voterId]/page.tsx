'use client';

import { getVoter } from '#/lib/api/voter';
import { Voter } from '#/lib/model/Voter';
import { useEffect, useState } from 'react';

interface Params {
  voterId: string;
}

export default function Page({ params }: { params: Params }) {
  const { voterId } = params;
  const [voter, setVoter] = useState<Voter | null>(null);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem('token') || '';
    getVoter(token, parseInt(voterId))
      .then((res) => setVoter(res))
      .catch((err) => console.log(err));
  }, [voterId]);

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
                <span className="label_text">First Name</span>
              </label>
              <input
                type="text"
                placeholder="First Name"
                className="input input-bordered w-full"
                value={voter?.firstName}
                disabled={!edit}
              />
            </div>

            <div className="form-control ring-2 p-2 rounded-md">
              <label className="label">
                <span className="label_text">Last Name</span>
              </label>
              <input
                type="text"
                placeholder="First Name"
                className="input input-bordered w-full"
                value={voter?.lastName}
                disabled={!edit}
              />
            </div>

            <div className="form-control ring-2 p-2 rounded-md">
              <label className="label">
                <span className="label_text">Date Of Birth</span>
              </label>
              <input
                type="text"
                placeholder="First Name"
                className="input input-bordered w-full"
                value={voter?.dateOfBirth}
                disabled={!edit}
              />
            </div>

            <div className="form-control ring-2 p-2 rounded-md">
              <label className="label">
                <span className="label_text">Credential 1</span>
              </label>
              <input
                type="text"
                placeholder="First Name"
                className="input input-bordered w-full"
                value={voter?.credential_1}
                disabled={!edit}
              />
            </div>

            {edit === true && (
              <button className="btn btn-primary col-start-2">Save</button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
