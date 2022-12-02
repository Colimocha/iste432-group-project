'use client';

import { Config } from '#/config';
import { useRouter } from 'next/navigation';
import { FormEvent } from 'react';
import MasterList from './MasterList';

interface Category {
  readonly category?:
    | 'voter'
    | 'societyContact'
    | 'employee'
    | 'society'
    | 'ballot'
    | 'office'
    | 'candidate';
}

// base on category, use different fields in the form
const fields = {
  voter: [
    ['firstName', 'First Name'],
    ['lastName', 'Last Name'],
    ['dateOfBirth', 'Date Of Birth'],
    ['credential_1', 'Credential 1'],
    ['credential_2', 'Credential 2'],
    ['societyId', 'Society ID'],
  ],
  societyContact: [
    ['username', 'Username'],
    ['password', 'Password'],
    ['societyId', 'Society Id'],
  ],
  employee: [
    ['username', 'Username'],
    ['password', 'Password'],
  ],
  society: [['name', 'Name']],
  ballot: [
    ['name', 'Name'],
    ['societyId', 'Society Id'],
  ],
  office: [
    ['name', 'Name'],
    ['ballotId', 'Ballot Id'],
  ],
  candidate: [
    ['firstName', 'First Name'],
    ['lastName', 'Last Name'],
    ['title', 'Title'],
    ['image', 'Image URL'],
    ['officeId', 'Office Id'],
    ['ballotId', 'Ballot Id'],
  ],
};

function getFieldType(field: string) {
  // if (field === 'image') return 'file';
  if (field === 'password') return 'password';
  if (RegExp('Id$').test(field)) return 'number';
  return 'text';
}

async function createItem(
  category: string,
  data: Record<string, string | number | File>,
) {
  const token = sessionStorage.getItem('token') || '';
  const res = await fetch(`${Config.API_URL}/${category}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return res;
}

export default function CreateModal(props: Category) {
  const router = useRouter();

  function handleCreate(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const object = Object.fromEntries(data.entries());
    console.log(object);
    // createItem(props.category || '', object);
    //refresh page
    router.refresh();
  }
  const arr = ['societyId', 'ballotId', 'officeId'];

  return (
    <>
      <div className="space-x-0">
        <label htmlFor="create_modal" className="btn-primary btn-sm btn">
          Add
        </label>
        <input type="checkbox" id="create_modal" className="modal-toggle" />
        <label htmlFor="create_modal" className="modal cursor-pointer">
          <label className="modal-box relative w-11/12 max-w-5xl" htmlFor="">
            <h3 className="text-lg font-bold capitalize">
              Create New
              <span className="text-red-500">
                &nbsp;{props && props.category}
              </span>
            </h3>
            <form
              className="mt-4 grid grid-cols-2 gap-4 normal-case"
              onSubmit={handleCreate}
            >
              {props.category &&
                fields[props.category!].map((field) => (
                  <>
                    {!arr.includes(field[0]) ? (
                      <div
                        className="form-control rounded-md p-2 ring-2"
                        key={field[0]}
                      >
                        <label className="label">
                          <span className="label_text text-base">
                            {field[1]}
                          </span>
                        </label>
                        <input
                          type={getFieldType(field[0])}
                          name={field[0]}
                          placeholder={field[1]}
                          className="input-bordered input w-full font-normal"
                          required
                        />
                      </div>
                    ) : (
                      <>
                        {field[0] === 'societyId' && (
                          <MasterList category="society" />
                        )}
                        {field[0] === 'officeId' && (
                          <MasterList category="office" />
                        )}
                        {field[0] === 'ballotId' && (
                          <MasterList category="ballot" />
                        )}
                      </>
                    )}
                  </>
                ))}
              <div className="modal-action col-span-2">
                <button className="btn-primary btn capitalize text-white">
                  {/* <label
                    className="btn-primary btn capitalize text-white"
                    htmlFor="create_modal"
                  > */}
                  Create
                  {/* </label> */}
                </button>
              </div>
            </form>
          </label>
        </label>
      </div>
    </>
  );
}
