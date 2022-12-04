'use client';
import { getVoter } from '#/lib/api/voter';
import { getBallot } from '#/lib/api/ballot';
import { Voter } from '#/lib/model/Voter';
import { createVote } from '#/lib/api/vote';
import { Ballot } from '#/lib/model/Ballot';
import { Candidate } from '#/lib/model/Candidate';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { off } from 'process';
import React from 'react';
export default function Page() {
  const [voter, setVoter] = useState<Voter>();
  const [ballot, setBallot] = useState<Ballot>();

  const router = useRouter();

  const token = sessionStorage.getItem('token') || '';
  const voterId = sessionStorage.getItem('voterId');
  const ballotId = sessionStorage.getItem('ballotId');

  let selectedPresident = "asdasdasdasdasd";
  let selectedVicePresident = "tesasdasdasdasdt";
  let treasurers = ["test", "tesasdasdasdt"];
  let secretaries = ["test", "teasdasdasdasdst", "tesasdasdaaasadt"];

  let selectedPresidentId = 6;
  let selectedVicePresidentId = 7;
  let treasurersId = [3, 4];
  let secretariesId = [3, 4];

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

    // to do - unselect all buttons (how the fk do i select all buttons)
  };

  // handle for Select button
  const handleSelect = (candidate: Candidate, officeName: string) => {

    // to do - colored the current button and uncolored the other buttons in same row if its on president or vice president row

    // testing - update specific position variable - fail..
    switch (officeName) {
      case "President":
        selectedPresident = candidate.firstName + " " + candidate.lastName;
        selectedPresidentId = candidate.id;
        console.log("selectedPreisdent: " + selectedPresident);

      case "Vice president":
        selectedVicePresident = candidate.firstName + " " + candidate.lastName;
        selectedVicePresidentId = candidate.id;
        console.log("selectedVicePreisdent " + selectedVicePresident);

      case "Secretary": ;
      case "Treasurer": ;
    }
  };

  // handle for Vote button
  const handleVote = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    // to do - wrap into bodyForm
    type BodyForm = {
      voted: boolean;
      result: string;
      isWriteIn: boolean;
      ballotId: number;
    };

    // testing
    const result = "{\n\t\"result\": {" +
      "\n\t\t\"President\": " + selectedPresidentId + "," +
      "\n\t\t\"Vice President\": " + selectedVicePresidentId + "," +
      "\n\t\t\"Secretary\": [" + secretariesId + "]," +
      "\n\t\t\"Treasurer\": [" + treasurersId + "]" +
      "\n\t}\n}"

    console.log(result)

    // testing
    let bodyForm: BodyForm = {
      voted: true,
      result: result,
      isWriteIn: true,
      ballotId: parseInt(ballotId!),
    };

    //  to do - verify adding the vote to database
    createVote(token, bodyForm)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

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
                    key={candidate.id}
                    onClick={() => handleSelect(candidate, office.name)}
                    className="btn btn-outline btn-accent btn-sm">
                    Unselected
                  </button>
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
              President
            </div>
            <div className="text-base-content/70 text-sm">
              &nbsp; {selectedPresident}
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
            {treasurers.map((treasurer) => (
              <div className="text-base-content/70 text-sm">
                &nbsp; {treasurer}
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
