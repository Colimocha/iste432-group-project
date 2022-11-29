'use client';

import { editSociety, getSociety } from '#/lib/api/society';
import { Ballot } from '#/lib/model/Ballot';
import { EditSociety, Society } from '#/lib/model/Society';
import clsx from 'clsx';
import { useEffect, useState } from 'react';

interface Params {
  societyId: string;
}

export default function Page({ params }: { params: Params }) {
  const { societyId } = params;
  const [data, setData] = useState<EditSociety>({
    name: '',
  });
  const [edit, setEdit] = useState(false);
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setToken(sessionStorage.getItem('token') || '');
    getSociety(token, parseInt(societyId))
      .then((res) => setData(res))
      .catch((err) => console.log(err));
  }, [societyId, token]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = event.target;
    setData({ ...data, [name]: type === 'number' ? parseInt(value) : value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setLoading(true);
    editSociety(token, Number(societyId), data)
      .then((res) => {
        setLoading(false);
        setEdit(false);
        setData(data);
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
                <span className="label_text">Ballot Name</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="Ballot Name"
                className="input-bordered input w-full"
                value={data?.name}
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
