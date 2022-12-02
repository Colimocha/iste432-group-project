'use client';

import MasterList from '#/components/dashboard/MasterList';
import { editBallot, getBallot } from '#/lib/api/ballot';
import { delay } from '#/lib/delay';
import { EditBallot } from '#/lib/model/Ballot';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';

interface Params {
  ballotId: string;
}

const fields = [
  ['start_date', 'Start Date'],
  ['end_date', 'End Date'],
  ['name', 'Name'],
];

const token = sessionStorage.getItem('token') || '';

export default function Page({ params }: { params: Params }) {
  const router = useRouter();
  const { ballotId } = params;
  const [data, setData] = useState<EditBallot>({
    name: '',
    societyId: 0,
    start_date: '',
    end_date: '',
    allowWriteIn: false,
  });
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getBallot(token, parseInt(ballotId))
      .then((res) => setData(res))
      .catch((err) => console.log(err));
  }, [ballotId]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = event.target;
    setData({
      ...data,
      [name]:
        type === 'number'
          ? parseInt(value)
          : type === 'checkbox'
          ? event.target.checked
          : value,
    });
  };

  const handleEdit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    const data = new FormData(form);
    const object = Object.fromEntries(data.entries());

    //convert to EditCandidate
    const editBallotObject: EditBallot = {
      name: object.name as string,
      societyId: parseInt(object.societyId as string),
      start_date: object.start_date as string,
      end_date: object.end_date as string,
      allowWriteIn: object.allowWriteIn === 'true',
    };

    delay().then(() => {
      editBallot(token, Number(ballotId), editBallotObject)
        .then((res) => {
          setLoading(false);
          setEdit(false);
        })
        .catch((err) => {
          setLoading(false);
        });
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
                  type={
                    key === 'start_date' || key === 'end_date' ? 'date' : 'text'
                  }
                  name={key}
                  placeholder={label}
                  className="input-bordered input w-full"
                  value={
                    key === 'name'
                      ? data.name
                      : key === 'start_date'
                      ? data.start_date
                      : key === 'end_date'
                      ? data.end_date
                      : ''
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

            <div className="form-control items-center justify-center rounded-md px-2 py-1 ring-2">
              <label className="label cursor-pointer space-x-20">
                <span className="label-text">Allow Write In?</span>
                <input
                  type="checkbox"
                  className="checkbox"
                  name="allowWriteIn"
                  checked={data.allowWriteIn}
                  onChange={handleInputChange}
                  disabled={!edit}
                />
              </label>
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
