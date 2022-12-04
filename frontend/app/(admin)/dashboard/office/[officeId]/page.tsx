'use client';

import MasterList from '#/components/dashboard/MasterList';
import { editOffice, getOffice } from '#/lib/api/office';
import { delay } from '#/lib/delay';
import { EditOffice } from '#/lib/model/Office';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface Params {
  officeId: string;
}

const fields = [
  ['name', 'Name'],
  ['limit', 'Maximum Number of Candidates'],
];

const token = sessionStorage.getItem('token') || '';

export default function Page({ params }: { params: Params }) {
  const { officeId } = params;
  const [data, setData] = useState<EditOffice>({
    name: '',
    limit: 1,
    ballotId: 0,
  });
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    getOffice(token, parseInt(officeId))
      .then((res) => setData(res))
      .catch((err) => console.log(err));
  }, [officeId]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = event.target;
    setData({ ...data, [name]: type === 'number' ? parseInt(value) : value });
  };

  const handleEdit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    const data = new FormData(form);
    const object = Object.fromEntries(data.entries());

    //convert to EditOffice
    const editOfficeObject: EditOffice = {
      name: object.name as string,
      limit: parseInt(object.limit as string),
      ballotId: parseInt(object.ballotId as string),
    };

    delay().then(() => {
      editOffice(token, parseInt(officeId), editOfficeObject)
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
                  value={key === 'name' ? data.name : ''}
                  onChange={handleInputChange}
                  disabled={!edit}
                />
              </div>
            ))}

            <MasterList
              category="ballot"
              value={data.ballotId}
              change={handleInputChange}
              disabled={!edit}
            />

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
