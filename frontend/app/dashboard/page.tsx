'use client';

import Stat from '#/components/Stat';
import { getBallots } from '#/lib/api/ballot';
import { getEmployees } from '#/lib/api/employee';
import { getSocieties } from '#/lib/api/society';
import { getVoters } from '#/lib/api/voter';
import { useEffect, useState } from 'react';

export default function Page() {
  const [ballots, setBallots] = useState('');
  const [employees, setEmployees] = useState('');
  const [societies, setSocieties] = useState('');
  const [voters, setVoters] = useState('');

  useEffect(() => {
    const token = sessionStorage.getItem('token') || '';

    getBallots(token)
      .then((res) => setBallots(res.length))
      .catch((err) => console.log(err));

    getEmployees(token)
      .then((res) => setEmployees(res.length))
      .catch((err) => console.log(err));

    getSocieties(token)
      .then((res) => setSocieties(res.length))
      .catch((err) => console.log(err));

    getVoters(token)
      .then((res) => setVoters(res.length))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <div className="flex flex-col space-y-4 lg:flex-row lg:justify-between lg:space-y-0">
        <Stat title="Voter" value={voters} />
        <Stat title="Society Contact" value={societies} />
        <Stat title="Employee" value={employees} />
        <Stat title="Ballot" value={ballots} />
        <Stat title="Vote" value="0" />
      </div>
    </>
  );
}
