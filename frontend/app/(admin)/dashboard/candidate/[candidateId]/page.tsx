'use client';

import MasterList from '#/components/dashboard/MasterList';
import { editCandidate, getCandidate } from '#/lib/api/candidate';
import { delay } from '#/lib/delay';
import { EditCandidate } from '#/lib/model/Candidate';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';

interface Params {
  candidateId: string;
}

const fields = [
  ['firstName', 'First Name'],
  ['lastName', 'Last Name'],
  ['title', 'Title'],
  ['image', 'Image URL'],
];

const token = sessionStorage.getItem('token') || '';

export default function Page({ params }: { params: Params }) {
  const router = useRouter();
  const { candidateId } = params;
  const [data, setData] = useState<EditCandidate>({
    firstName: '',
    lastName: '',
    title: '',
    image: '',
    ballotId: 0,
    officeId: 0,
  });
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getCandidate(token, parseInt(candidateId))
      .then((res) => setData(res))
      .catch((err) => console.log(err));
  }, [candidateId]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = event.target;
    setData({ ...data, [name]: type === 'number' ? parseInt(value) : value });
  };

  const handleEdit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    const data = new FormData(form);
    const object = Object.fromEntries(data.entries());

    //convert to EditCandidate
    const editCandidateObject: EditCandidate = {
      firstName: object.firstName as string,
      lastName: object.lastName as string,
      title: object.title as string,
      image: object.image as string,
      ballotId: parseInt(object.ballotId as string),
      officeId: parseInt(object.officeId as string),
    };

    delay().then(() => {
      editCandidate(token, Number(candidateId), editCandidateObject)
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
            checked={edit}
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
                      : key === 'title'
                      ? data.title
                      : data.image
                  }
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
            <MasterList
              category="office"
              value={data.officeId}
              change={handleInputChange}
              disabled={!edit}
            />

            {edit && (
              <button
                className={clsx('btn-primary btn col-start-2', {
                  loading: loading,
                })}
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
