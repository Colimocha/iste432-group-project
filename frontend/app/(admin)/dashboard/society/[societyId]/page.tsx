'use client';

import { editSociety, getSociety } from '#/lib/api/society';
import { delay } from '#/lib/delay';
import { EditSociety } from '#/lib/model/Society';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface Params {
  societyId: string;
}

const token = sessionStorage.getItem('token') || '';

export default function Page({ params }: { params: Params }) {
  const { societyId } = params;
  const [data, setData] = useState<EditSociety>({
    name: '',
  });
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    getSociety(token, parseInt(societyId))
      .then((res) => setData(res))
      .catch((err) => console.log(err));
  }, [societyId]);

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

    //convert to EditSociety
    const editSocietyObject: EditSociety = {
      name: object.name as string,
    };

    delay().then(() => {
      editSociety(token, parseInt(societyId), editSocietyObject)
        .then(() => {
          setEdit(false);
        })
        .catch((err) => console.log(err))
        .finally(() => setLoading(false));
    });
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
            <div className="form-control col-span-2 rounded-md p-2 ring-2">
              <label className="label">
                <span className="label_text">Society Name</span>
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
