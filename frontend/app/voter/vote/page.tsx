'use client';
import { getVoter } from '#/lib/api/voter';
import { getBallot } from '#/lib/api/ballot';
import { Voter } from '#/lib/model/Voter';
import { Vote } from '#/lib/model/Vote';
import { Ballot } from '#/lib/model/Ballot';
import { Office } from '#/lib/model/Office';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { off } from 'process';
export default function Page() {
  const [voter, setVoter] = useState<Voter>();
  const [ballot, setBallot] = useState<Ballot>();

  const router = useRouter();

  const token = sessionStorage.getItem('token') || '';
  const voterId = sessionStorage.getItem('voterId');
  const ballotId = sessionStorage.getItem('ballotId');

  const selectedPreisdent = "asdasdasdasdasd";
  const selectedVicePresident = "tesasdasdasdasdt";
  const treasurers = ["test", "tesasdasdasdt"];
  const secretaries = ["test", "teasdasdasdasdst", "tesasdasdaaasadt"];

  // fetch data
  useEffect(() => {
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

    // handle for Select button
    const handleSelect = (e: { preventDefault: () => void }) => {
      e.preventDefault();

      // to do - colored the button and uncolored the other buttons in same row

      // to do - set candidate id value to candidate Id array
    };

  // handle for Vote button
  const handleVote = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    // to do - wrap into vote entity


    // async function createVote(
    //   token: string,
    //   bodyForm: {
    //     voted: boolean;
    //     result: string;
    //     isWriteIn: boolean;
    //     ballotId: number;
    //   },

    // // to do - verify add the vote entity to database

    // createVoter(token, parseInt(vote!))
    //   .then((res) => setVoter(res))
    //   .catch((err) => console.log(err));

    // to do - generate confirmation code and store it database with
    // the vote entity

    router.push('/voter/vote/review');
  };

  return (
    <div className="container bg-gray-200">
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
          {ballot?.name} Ballot
        </div>
      </div>
      {/* end of ballot name */}

      {ballot?.Office?.map((office) => (
        <div className="content flex items-center justify-center">

          <div className="whiteBackground w-1/2 rounded-md bg-[#fafaf9] p-3 m-3">
            <div className="sectionTitle m-2 text-center text-3xl font-bold">
              {office.name}
            </div>

            <div className="mt-6 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:gap-y-5">

              {office.Candidate?.map((candidate) => (
                <div
                  key={candidate.id}
                  className="bg-base-100 rounded-box mx-2 grid w-72 flex-shrink-0 place-items-center items-center gap-4 p-4 py-8 shadow-xl xl:mx-0 xl:w-full">
                  <div className="avatar">
                    <div className="mask mask-squircle bg-base-content h-24 w-24 bg-opacity-10 p-px">
                      <img src="https://iili.io/HfipnUl.jpg" width="94" height="94" alt="Profile Image" className="mask mask-squircle" />
                    </div>
                  </div>
                  <div>
                    <div className="text-center">
                      <div className="text-lg font-extrabold">
                        {candidate.firstName} {candidate.lastName}
                      </div>
                      <div className="text-base-content/70 my-3 text-sm">
                        biography<br /> {/*where is bio? */}
                        statement<br /> {/*where is statement? */}
                      </div>
                    </div>
                  </div>
                  <button
                    className="btn btn-outline btn-accent btn-sm">Unselected</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}

      <div className="fixed bottom-3 right-3">
        <div
          className="bg-base-100 rounded-box place-items-center items-center gap-4 p-4 py-8 shadow-xl">
          <div>
            <div className="text-lg font-bold">
              Preisdent
            </div>
            <div className="text-base-content/70 text-sm">
              &nbsp; {selectedPreisdent}
            </div>
            <div className="text-lg font-bold">
              Vice President
            </div>
            <div className="text-base-content/70 text-sm">
              &nbsp; {selectedVicePresident}
            </div>
            <div className="text-lg font-bold">
              Secretaries
            </div>
            {secretaries.map((secretary) => (
              <div className="text-base-content/70 text-sm">
                &nbsp; {secretary}
              </div>
            ))}
            <div className="text-lg font-bold">
              Treasurers
            </div>
            {treasurers.map((Treasurer) => (
              <div className="text-base-content/70 text-sm">
                &nbsp; {Treasurer}
              </div>
            ))}
          </div>
        </div>

        <button
          className="btn m-2 btn-accent btn-sm"
          onClick={handleClear}>
          Clear
        </button>

        <button
          className="btn btn-accent btn-sm"
          onClick={handleVote}>
          Vote
        </button>
      </div>

    </div>
  );
}
