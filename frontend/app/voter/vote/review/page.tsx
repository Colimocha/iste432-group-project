'use client';
import { getVoters } from '#/lib/api/voter';
import { Voter } from '#/lib/model/Voter';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Page() {
  const [voters, setVoters] = useState([]);

  const router = useRouter();

  useEffect(() => {
    const token = sessionStorage.getItem('token') || '';
    getVoters(token)
      .then((res) => setVoters(res))
      .catch((err) => console.log(err));

    console.log(voters);
  }, []);

  // handle for Logout button
  const handleLogout = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    sessionStorage.removeItem('token');
    router.push('/auth');
  };

  // handle for Go Back button
  const handleGoBack = (e: { preventDefault: () => void }) => {
    e.preventDefault();
  };

  // handle for Submit button
  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    router.push('/vote/review/result');
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
          Ballot Name
        </div>
      </div>
      {/* end of ballot name */}

      <div className="content flex items-center justify-center">
        {/* white background */}
        <div className="whiteBackground w-2/3 rounded-md bg-[#fafaf9] p-3">
          {/* president section */}
          <div className="presidentSection">
            {/* president title */}
            <div className="presidentTitle m-2 text-center text-2xl font-bold">
              Review
            </div>
            {/* end of president title */}

            <div className="presidentItems columns-5">
              <div>
                <div className="presidentTitle text-center text-base font-bold">
                  President
                </div>
                <div className="presidentCard w-30 glass">
                  <figure>
                    <img src="https://placeimg.com/400/225/arch" alt="car!" />
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title">Life hack</h2>
                    <p>How to park your car at your garage?</p>
                  </div>
                </div>
              </div>

              <div>
                <div className="vicePresidentTitle text-center text-base font-bold">
                  Vice President
                </div>
                <div className="vicePresidentCard w-30 glass">
                  <figure>
                    <img src="https://placeimg.com/400/225/arch" alt="car!" />
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title">Life hack</h2>
                    <p>How to park your car at your garage?</p>
                  </div>
                </div>
              </div>

              <div>
                <div className="secretaryTitle text-center text-base font-bold">
                  Secretary
                </div>
                <div className="secretaryCard w-30 glass">
                  <figure>
                    <img src="https://placeimg.com/400/225/arch" alt="car!" />
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title">Life hack</h2>
                    <p>How to park your car at your garage?</p>
                  </div>
                </div>
              </div>

              <div>
                <div className="treasurerTitle text-center text-base font-bold">
                  Treasurer
                </div>
                <div className="treasurerCard w-30 glass">
                  <figure>
                    <img src="https://placeimg.com/400/225/arch" alt="car!" />
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title">Life hack</h2>
                    <p>How to park your car at your garage?</p>
                  </div>
                </div>
              </div>

              <div>
                <div className="treasurerTitle text-center text-base font-bold">
                  Treasurer
                </div>
                <div className="treasurerCard w-30 glass">
                  <figure>
                    <img src="https://placeimg.com/400/225/arch" alt="car!" />
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title">Life hack</h2>
                    <p>How to park your car at your garage?</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bottomSection">
            <div className="... flex flex-row-reverse bg-[#fafaf9] p-2">
              <button
                className="btn-black btn-outline btn m-1"
                onClick={handleSubmit}
              >
                Submit
              </button>
              <button
                className="btn-black btn-outline btn m-1"
                onClick={handleGoBack}
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
        {/* end of white background */}
      </div>
    </div>
  );
}
