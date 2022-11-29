'use client';
import { getVoter, getVoters } from '#/lib/api/voter';
import { getBallots, getBallotsBySocietyID } from '#/lib/api/ballot';
import { Ballot } from '#/lib/model/Ballot';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ca from 'date-fns/esm/locale/ca/index.js';

export default function Page() {
  const [ballots, setBallots] = useState<Ballot[]>([]);
  const router = useRouter();

  const cars = ['Saab', 'Volvo'];

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

  const handleEnter = (ballot: Ballot) => {
    // to do - push to rush with selected ballot data
    sessionStorage.setItem('ballotId', ballot.id.toString());
    router.push('/voter/vote');
  };

  function getColumns() {
    console.log('columns-' + ballots.length);
    return 'columns-' + ballots.length;
  }

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
        <div className="w-1/2 p-5 text-center text-4xl font-bold text-white">
          Ballot Selection
        </div>
      </div>
      {/* end of ballot name */}

      <div className="content flex items-left justify-left overflow-x-scroll pb-10 scrollbar-hide md:scrollbar-default">
        <div className="ml-10 flex flex-nowrap md:ml-20 lg:ml-40 ">
          <div className={getColumns()}>
            {/* use loop to create cards of ballot */}
            {ballots.map((ballot) => (
              <div className="card image-full w-96 bg-base-100 shadow-xl">
                <figure>
                  <img src="https://placeimg.com/400/225/arch" alt="Shoes" />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{ballot.name}</h2>
                  <p>{ballot.createdAt}</p>
                  <div className="card-actions justify-end">
                    <button
                      className="btn-black btn-outline btn m-1"
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
