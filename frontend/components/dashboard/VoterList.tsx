'use client';

import { getVoters } from '#/lib/api/voter';
import { Voter } from '#/lib/model/Voter';
import { useEffect, useState } from 'react';

export default function VoterList() {
  const [voters, setVoters] = useState([]);

  useEffect(() => {
    const token = sessionStorage.getItem('token') || '';
    getVoters(token)
      .then((res) => setVoters(res))
      .catch((err) => console.log(err));
  }, []);

  return (
    <table className="table table-zebra w-full">
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Date Of Birth</th>
          <th>Controls</th>
        </tr>
      </thead>
      <tbody>
        {voters.map((voter: Voter, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>
              {voter.firstName} {voter.lastName}
            </td>
            <td>{voter.dateOfBirth}</td>
            <td className="space-x-2">
              <button className="btn btn-sm btn-primary">Edit</button>
              <button className="btn btn-sm btn-error">Remove</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
