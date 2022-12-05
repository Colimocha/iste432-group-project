'use client';

import { Config } from '#/config';
import { useEffect, useState } from 'react';

interface Props {
  readonly category: 'society' | 'office' | 'ballot';
  value?: number | undefined;
  disabled?: boolean | undefined;
  change?: (e: any) => void | undefined;
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

export default function MasterList({
  category,
  value,
  disabled,
  change,
}: Props) {
  const [list, setList] = useState([]);

  useEffect(() => {
    getList(category).then((res) => setList(res));
  }, [category]);

  return (
    <>
      <div className="form-control w-full rounded-md p-2 ring-2">
        <label className="label">
          <span className="label-text text-base capitalize">{category}</span>
        </label>
        <select
          className="select-bordered select"
          name={category + 'Id'}
          value={value}
          disabled={disabled}
          defaultValue=""
          onChange={change}
        >
          {list.length > 0 ? (
            list.map((item: any) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))
          ) : (
            <></>
          )}
        </select>
      </div>
    </>
  );
}
