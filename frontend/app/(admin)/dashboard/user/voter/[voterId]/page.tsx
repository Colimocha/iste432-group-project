'use client';

import MasterList from '#/components/dashboard/MasterList';
import { editVoter, getVoter } from '#/lib/api/voter';
import { delay } from '#/lib/delay';
import { EditVoter } from '#/lib/model/Voter';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface Params {
  voterId: string;
}

const fields = [
  ['firstName', 'First Name'],
  ['lastName', 'Last Name'],
  ['dateOfBirth', 'Date of Birth'],
  ['credential_1', 'Credential 1'],
];

const token = sessionStorage.getItem('token') || '';

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
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    getVoter(token, parseInt(voterId))
      .then((res) => setData(res))
      .catch((err) => console.log(err));
  }, [voterId]);

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

    //convert to EditVoter
    const editVoterObject: EditVoter = {
      firstName: object.firstName as string,
      lastName: object.lastName as string,
      dateOfBirth: object.dateOfBirth as string,
      credential_1: object.credential_1 as string,
      societyId: parseInt(object.societyId as string),
    };

    delay().then(() => {
      editVoter(token, parseInt(voterId), editVoterObject)
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
                  value={
                    key === 'firstName'
                      ? data.firstName
                      : key === 'lastName'
                      ? data.lastName
                      : key === 'dateOfBirth'
                      ? data.dateOfBirth
                      : data.credential_1
                  }
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
