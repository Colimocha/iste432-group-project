'use client';
import { getVoter } from '#/lib/api/voter';
import { getSocieties } from '#/lib/api/society';
import { getBallot } from '#/lib/api/ballot';
import { Voter } from '#/lib/model/Voter';
import { Society } from '#/lib/model/Society';
import { Ballot } from '#/lib/model/Ballot';
import { Office } from '#/lib/model/Office';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
export default function Page() {
  const [voter, setVoter] = useState<Voter[]>([]);
  const [ballot, setBallot] = useState<Ballot[]>([]);

  const router = useRouter();

  // fetch data
  useEffect(() => {
    const token = sessionStorage.getItem('token') || '';
    const voterId = sessionStorage.getItem('voterId');
    const ballotId = sessionStorage.getItem('ballotId');

    // get voter who logged in
    getVoter(token, parseInt(voterId!))
      .then((res) => setVoter(res))
      .catch((err) => console.log(err));

      // get selected ballot
    getBallot(token, parseInt(ballotId!))
      .then((res) => setBallot(res))
      .catch((err) => console.log(err));
  }, []);

  console.log(ballot);

  // handle for Logout button
  const handleLogout = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    // remove token from session storage
    sessionStorage.removeItem('token');

    // push back to login page
    router.push('/auth');
  };

  // handle for Clear button
  const handleClear = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    // to do - clear all checkboxes
  };

  // handle for Review button
  const handleReview = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    // to do - wrap into vote entity

    // to do - verify add the vote entity to database

    // to do - generate confirmation code and store it database with
    // the vote entity

    router.push('/voter/vote/review');
  };

  return (
    <div className="container bg-gray-100">
      {/* top bar */}
      <div className="... flex flex-row-reverse bg-zinc-900 p-2">
        <button
          className="btn-outline btn-info btn m-1"
          onClick={handleLogout}
        >
          Log out
        </button>
      </div>
      {/* end of top bar */}

      {/* ballot name */}
      <div className="content flex items-center justify-center">
        <div className="whiteBackground w-1/2 p-5 text-center text-4xl font-bold">
          Ballot Name
        </div>
      </div>
      {/* end of ballot name */}

      <div className="content flex items-center justify-center">
        {/* white background */}
        <div className="whiteBackground w-1/2 rounded-md bg-[#fafaf9] p-3">
          {/* president section */}
          <div className="presidentSection">
            {/* president title */}
            <div className="presidentTitle m-2 text-center text-2xl font-bold">
              Presidents
            </div>
            {/* end of president title */}

            <div className="presidentItems columns-3">
              <div className="presidentCard w-30 glass">
                <figure>
                  <img src="https://placeimg.com/400/225/arch" alt="car!" />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">Life hack</h2>
                  <p>How to park your car at your garage?</p>
                  <div className="card-actions justify-end">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="checkbox-secondary checkbox"
                    />
                  </div>
                </div>
              </div>

              <div className="presidentCard w-30 glass">
                <figure>
                  <img src="https://placeimg.com/400/225/arch" alt="car!" />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">Life hack</h2>
                  <p>How to park your car at your garage?</p>
                  <div className="card-actions justify-end">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="checkbox-secondary checkbox"
                    />
                  </div>
                </div>
              </div>

              <div className="presidentCard w-30 glass">
                <figure>
                  <img src="https://placeimg.com/400/225/arch" alt="car!" />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">Life hack</h2>
                  <p>How to park your car at your garage?</p>
                  <div className="card-actions justify-end">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="checkbox-secondary checkbox"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="vicePresidentSection pt-4">
            {/* vice president title */}
            <div className="vicePresidentTitle m-2 text-center text-2xl font-bold">
              Vice Presidents
            </div>
            {/* end of vice president title */}

            <div className="vicePresidentItems columns-3">
              <div className="vicePresidentCard w-30 glass">
                <figure>
                  <img src="https://placeimg.com/400/225/arch" alt="car!" />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">Life hack</h2>
                  <p>How to park your car at your garage?</p>
                  <div className="card-actions justify-end">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="checkbox-secondary checkbox"
                    />
                  </div>
                </div>
              </div>

              <div className="vicePresidentCard w-30 glass">
                <figure>
                  <img src="https://placeimg.com/400/225/arch" alt="car!" />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">Life hack</h2>
                  <p>How to park your car at your garage?</p>
                  <div className="card-actions justify-end">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="checkbox-secondary checkbox"
                    />
                  </div>
                </div>
              </div>

              <div className="vicePresidentCard w-30 glass">
                <figure>
                  <img src="https://placeimg.com/400/225/arch" alt="car!" />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">Life hack</h2>
                  <p>How to park your car at your garage?</p>
                  <div className="card-actions justify-end">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="checkbox-secondary checkbox"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="secretarySection">
            <div className="secretaryTitle m-2 text-center text-2xl font-bold">
              Secretary
            </div>

            <div className="secretaryItems columns-3">
              <div className="secretaryCard w-30 glass">
                <figure>
                  <img src="https://placeimg.com/400/225/arch" alt="car!" />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">Life hack</h2>
                  <p>How to park your car at your garage?</p>
                  <div className="card-actions justify-end">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="checkbox-secondary checkbox"
                    />
                  </div>
                </div>
              </div>

              <div className="secretaryCard w-30 glass">
                <figure>
                  <img src="https://placeimg.com/400/225/arch" alt="car!" />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">Life hack</h2>
                  <p>How to park your car at your garage?</p>
                  <div className="card-actions justify-end">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="checkbox-secondary checkbox"
                    />
                  </div>
                </div>
              </div>

              <div className="secretaryCard w-30 glass">
                <figure>
                  <img src="https://placeimg.com/400/225/arch" alt="car!" />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">Life hack</h2>
                  <p>How to park your car at your garage?</p>
                  <div className="card-actions justify-end">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="checkbox-secondary checkbox"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="treasurerSection">
            <div className="treasurerTitle m-2 text-center text-2xl font-bold">
              Treasurer
            </div>

            <div className="treasurerItems columns-3">
              <div className="treasurerCard w-30 glass">
                <figure>
                  <img src="https://placeimg.com/400/225/arch" alt="car!" />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">Life hack</h2>
                  <p>How to park your car at your garage?</p>
                  <div className="card-actions justify-end">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="checkbox-secondary checkbox"
                    />
                  </div>
                </div>
              </div>

              <div className="treasurerCard w-30 glass">
                <figure>
                  <img src="https://placeimg.com/400/225/arch" alt="car!" />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">Life hack</h2>
                  <p>How to park your car at your garage?</p>
                  <div className="card-actions justify-end">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="checkbox-secondary checkbox"
                    />
                  </div>
                </div>
              </div>

              <div className="treasurerCard w-30 glass">
                <figure>
                  <img src="https://placeimg.com/400/225/arch" alt="car!" />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">Life hack</h2>
                  <p>How to park your car at your garage?</p>
                  <div className="card-actions justify-end">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="checkbox-secondary checkbox"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bottomSection">
            <div className="... flex flex-row-reverse bg-[#fafaf9] p-2">
              <button
                className="btn-black btn-outline btn m-1"
                onClick={handleReview}
              >
                Review
              </button>
              <button
                className="btn-black btn-outline btn m-1"
                onClick={handleClear}
              >
                Clear
              </button>
            </div>
          </div>
        </div>
        {/* end of white background */}
      </div>
    </div>
  );
}
