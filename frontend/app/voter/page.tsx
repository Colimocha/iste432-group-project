'use client';
import { getVoter } from '#/lib/api/voter';
import { getSociety } from '#/lib/api/society';
import { getBallotsBySocietyID } from '#/lib/api/ballot';
import { Ballot } from '#/lib/model/Ballot';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Society } from '#/lib/model/Society';

// Ballot Section

export default function Page() {
  const [ballots, setBallots] = useState<Ballot[]>([]);
  const [society, setSociety] = useState<Society>();
  const router = useRouter();

  // fetch data
  useEffect(() => {
    const token = sessionStorage.getItem('token') || '';
    const voterId = sessionStorage.getItem('voterId');

    getVoter(token, parseInt(voterId!))
      .then((voter) => {
        getSociety(token, parseInt(voter.societyId))
          .then((b) => setSociety(b))
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));

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

  const handleEnter = (ballot: Ballot) => {
    // to do - push to rush with selected ballot data
    sessionStorage.setItem('ballotId', ballot.id.toString());
    router.push('/voter/vote');
  };

  return (
    // content
    <div className="content bg-gray-100">
      {/* navigation bar */}
      <div className="... flex flex-row-reverse bg-zinc-900 p-2">
        <button className="btn-outline btn-info btn m-1" onClick={handleLogout}>
          Log out
        </button>
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl py-1 sm:py-8 lg:max-w-none lg:py-10">
          <h2 className="text-2xl font-bold text-gray-900">Ballot Selection</h2>
          <div className="mt-6 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:gap-y-5">
            {ballots.map((ballot) => (
              <div className="card image-full w-96 bg-base-100">
                <figure>
                  <img src="https://iili.io/HfipnUl.jpg" alt="Shoes" />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{ballot.name}</h2>
                  <p>{society?.name}</p>
                  <div className="card-actions justify-end">
                    <button
                      className="btn-accent btn btn m-1"
                      onClick={(e) => handleEnter(ballot)}
                    >
                      Enter
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
