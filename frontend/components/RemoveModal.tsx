'use client';

import { deleteBallot } from '#/lib/api/ballot';
import { deleteEmployee } from '#/lib/api/employee';
import { deleteOffice } from '#/lib/api/office';
import { deleteSociety } from '#/lib/api/society';
import { deleteSocietyContact } from '#/lib/api/societyContact';
import { deleteVoter } from '#/lib/api/voter';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function RemoveModal({
  id,
  table,
}: {
  id: number;
  table: string;
}) {
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState('');
  const router = useRouter();

  useEffect(() => {
    setToken(sessionStorage.getItem('token') || '');
  }, [id, token]);

  const handleRemove = () => {
    setLoading(true);

    setTimeout(() => {
      switch (table) {
        case 'voter':
          deleteVoter(token, id)
            .then((res) => {
              setLoading(false);
              router.refresh();
            })
            .catch((err) => {
              console.log(err);
              setLoading(false);
            });
          break;
        case 'societyContact':
          deleteSocietyContact(token, id)
            .then((res) => {
              setLoading(false);
              router.refresh();
            })
            .catch((err) => {
              console.log(err);
              setLoading(false);
            });
          break;
        case 'employee':
          deleteEmployee(token, id)
            .then((res) => {
              setLoading(false);
              router.refresh();
            })
            .catch((err) => {
              console.log(err);
              setLoading(false);
            });
          break;
        case 'ballot':
          deleteBallot(token, id)
            .then((res) => {
              setLoading(false);
              router.refresh();
            })
            .catch((err) => {
              console.log(err);
              setLoading(false);
            });
          break;
        case 'office':
          deleteOffice(token, id)
            .then((res) => {
              setLoading(false);
              router.refresh();
            })
            .catch((err) => {
              console.log(err);
              setLoading(false);
            });
          break;
        case 'society':
          deleteSociety(token, id)
            .then((res) => {
              setLoading(false);
              router.refresh();
            })
            .catch((err) => {
              console.log(err);
              setLoading(false);
            });
          break;
        default:
          break;
      }
    }, 2000);
  };

  return (
    <div className="dropdown-bottom dropdown-end dropdown">
      <label tabIndex={0} className="btn-error btn-sm btn">
        Remove
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content menu rounded-box w-auto bg-base-100 p-4 shadow"
      >
        <li className="py-2">Confirmed for removal?</li>
        <li>
          <button
            className={clsx('btn-error btn-sm btn', {
              loading: loading,
            })}
            onClick={handleRemove}
          >
            Yes
          </button>
        </li>
      </ul>
    </div>
  );
}
