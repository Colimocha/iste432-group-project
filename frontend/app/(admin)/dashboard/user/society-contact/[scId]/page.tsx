'use client';

import { useEffect, useState } from 'react';
import { SocietyContact } from '#/lib/model/SocietyContact';
import { getSocietyContact } from '#/lib/api/societyContact';

interface Params {
  scId: string;
}

export default function Page({ params }: { params: Params }) {
  const { scId } = params;
  const [edit, setEdit] = useState(false);
  const [data, setData] = useState<SocietyContact | null>(null);

  useEffect(() => {
    const token = sessionStorage.getItem('token') || '';
    getSocietyContact(token, parseInt(scId))
      .then((res) => setData(res))
      .catch((err) => console.log(err));
  }, [scId]);

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
                value={data?.username}
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
                value={data?.societyId}
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
