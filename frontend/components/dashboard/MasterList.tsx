'use client';

import { Config } from '#/config';
import { useEffect, useState } from 'react';

interface Props {
  readonly category: 'society' | 'office' | 'ballot';
}

async function getList(category: string) {
  const token = sessionStorage.getItem('token') || '';
  const list = await fetch(Config.API_URL + '/' + category, {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });
  return await list.json();
}

export default function MasterList({ category }: Props) {
  const [list, setList] = useState([]);

  useEffect(() => {
    getList(category).then((res) => setList(res));
  }, [category]);

  return (
    <>
      <div className="form-control w-full ring-2 p-2">
        <label className="label">
          <span className="label-text">{category.toUpperCase()}</span>
        </label>
        <select
          className="select select-bordered"
          name={category + 'Id'}
          required
        >
          {list.map((item: any) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}
