'use client';
import { getVoter, getVoters } from '#/lib/api/voter';
import { getSocieties } from '#/lib/api/society';
import { getBallots, getBallotsBySocietyID } from '#/lib/api/ballot';
import { Voter } from '#/lib/model/Voter';
import { Ballot } from '#/lib/model/Ballot';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
export default function Page() {
    
  const [ballots, setBallots] = useState<Ballot[]>([]);
  const router = useRouter();

  // fetch data
  useEffect(() => {
    const token = sessionStorage.getItem('token') || '';
    const voterId = sessionStorage.getItem('voterId');
    getVoter(token, parseInt(voterId!))
      .then((voter) => {
        getBallotsBySocietyID(token, voter.societyId)
          .then((b) => setBallots(b))
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }, []);

  // handle for Logout button
  const handleLogout = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    sessionStorage.removeItem('token');
    router.push('/auth');
  };

  // handle for Review button
  const handleOk = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    // to do - wrap into vote entity

    // to do - verify add the vote entity to database

    // to do - generate confirmation code and store it database with
    // the vote entity

    router.push('/vote/review');
  };

  return (
    <div className="container">
      {/* top bar */}
      <div className="... flex flex-row-reverse p-2">
        <button
          className="btn-outline btn-accent btn m-1"
          onClick={handleLogout}
        >
          Log out
        </button>
      </div>
      {/* end of top bar */}

      {/* ballot name */}
      <div className="content flex items-center justify-center">
        <div className="whiteBackground w-1/2 p-5 text-center text-4xl font-bold text-white">
          Ballots
        </div>
      </div>
      {/* end of ballot name */}

      <div className="content flex items-center justify-center"></div>
    </div>
  );
}
