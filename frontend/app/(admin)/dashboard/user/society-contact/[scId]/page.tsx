'use client';

import { useEffect, useState } from 'react';
import { EditSocietyContact } from '#/lib/model/SocietyContact';
import {
  editSocietyContact,
  getSocietyContact,
} from '#/lib/api/societyContact';
import clsx from 'clsx';
import MasterList from '#/components/dashboard/MasterList';
import { useRouter } from 'next/navigation';
import { delay } from '#/lib/delay';

interface Params {
  scId: string;
}

const fields = [
  ['username', 'Username'],
  ['password', 'Password'],
];

const token = sessionStorage.getItem('token') || '';

export default function Page({ params }: { params: Params }) {
  const { scId } = params;
  const [data, setData] = useState<EditSocietyContact>({
    username: '',
    password: '',
    societyId: 0,
  });
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    getSocietyContact(token, parseInt(scId))
      .then((res) => setData(res))
      .catch((err) => {});
  }, [scId]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = event.target;
    setData({ ...data, [name]: value });
  };

  const handleEdit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    const data = new FormData(form);
    const object = Object.fromEntries(data.entries());

    //convert to EditSocietyContact
    const editSocietyContactObject: EditSocietyContact = {
      username: object.username as string,
      password: (object.password as string) ?? undefined,
      societyId: parseInt(object.societyId as string),
    };

    if (editSocietyContactObject.password === '') {
      delete editSocietyContactObject.password;
    }

    delay().then(() => {
      editSocietyContact(token, parseInt(scId), editSocietyContactObject)
        .then(() => {
          setEdit(false);
        })
        .catch((err) => {
          console.error(err);
        })
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

            <MasterList
              category="society"
              value={data.societyId}
              change={handleInputChange}
              disabled={!edit}
            />

            {edit === true && (
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
