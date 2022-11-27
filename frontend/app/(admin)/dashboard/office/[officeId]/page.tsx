'use client';

import { getOffice } from '#/lib/api/office';
import { Office } from '#/lib/model/Office';
import { useEffect, useState } from 'react';

interface Params {
  officeId: string;
}

export default function Page({ params }: { params: Params }) {
  const { officeId } = params;
  const [data, setData] = useState<Office | null>(null);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem('token') || '';
    getOffice(token, parseInt(officeId))
      .then((res) => setData(res))
      .catch((err) => console.log(err));
  }, [officeId]);

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
                <span className="label_text">Office Name</span>
              </label>
              <input
                type="text"
                placeholder="Office Name"
                className="input input-bordered w-full"
                value={data?.name}
                disabled={!edit}
              />
            </div>

            <div className="form-control ring-2 p-2 rounded-md">
              <label className="label">
                <span className="label_text">Ballot</span>
              </label>
              <input
                type="text"
                placeholder="Ballot"
                className="input input-bordered w-full"
                value={data?.ballotId}
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
