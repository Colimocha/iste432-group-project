'use client';

import Stat from '#/components/Stat';
import { getStat } from '#/lib/api/analysis';
import { useEffect, useState } from 'react';

type Stat = {
  employees: number;
  societyContacts: number;
  voters: number;
  societies: number;
  ballots: number;
  offices: number;
  candidates: number;
  votes: number;
  ballot_completed: string;
  ballot_incomplete: string;
};

const role = sessionStorage.getItem('role') || '';

export default function Page() {
  const [data, setData] = useState<Stat>({
    employees: 0,
    societyContacts: 0,
    voters: 0,
    societies: 0,
    ballots: 0,
    offices: 0,
    candidates: 0,
    votes: 0,
    ballot_completed: '',
    ballot_incomplete: '',
  });

  const {
    employees,
    societyContacts,
    voters,
    societies,
    ballots,
    offices,
    candidates,
    votes,
    ballot_completed,
    ballot_incomplete,
  } = data;

  useEffect(() => {
    const token = sessionStorage.getItem('token') || '';

    getStat(token)
      .then((res) => setData(res))
      .catch((err) => {
        console.error(err);
      });
  }, [setData]);

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {role === 'employee' && (
          <>
            <Stat title="Employee" value={'' + employees} />
            <Stat title="Society Contact" value={'' + societyContacts} />
            <Stat title="Voter" value={'' + voters} />
            <Stat title="Society" value={'' + societies} />
            <Stat title="Office" value={'' + offices} />
            <Stat title="Candidates" value={'' + candidates} />
            <Stat title="Ballot" value={'' + ballots} />
            {/* <Stat title="Ballot Completed" value={'' + ballot_completed} /> */}
            {/* <Stat title="Ballot Incomplete" value={'' + ballot_incomplete} /> */}
            <Stat title="Vote" value={'' + votes} />
          </>
        )}

        {role === 'society_contact' && (
          <>
            <Stat title="Ballot" value={'' + ballots} />
            <Stat title="Vote" value={'' + votes} />
          </>
        )}
      </div>
    </>
  );
}
