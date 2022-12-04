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
import { Office } from '#/lib/model/Office';

interface ListOC {
  office: string,
  candidates: [{
    id: number,
    full_name: string,
    selected: boolean
  }]
}

const voteId = sessionStorage.getItem('voteId') || '';

export default function Page() {
  const [voter, setVoter] = useState<Voter>();
  const [ballot, setBallot] = useState<Ballot>();
  const [office, setOffice] = useState<Office[]>();
  // const [buttons, setButtons] = useState<ListOC>({
  //   "office": "President",
  //   candidates: [{
  //     id:6,
  //     full_name: "whatever",
  //     selected: false
  //   }]
  // });
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

  const buttons = new Map();
  const elements = [];

  // const convertMap = (ballot: Ballot, offices: Office) => {
  //   const map = new Map();
  //   for (const office of offices) {
  //     map.set(office.name, {});
  //     for (const candidate of office.Candidate!) {
  //       map[office.name][candidate.id] = {
  //         id: candidate.id,
  //         full_name: `${candidate.firstName} ${candidate.lastName}`,
  //         selected: false,
  //       };
  //     }
  //   }
  //   return map;
  // }

  // console.log(convertMap(office!));
  // console.log(ballot);

  useEffect(() => {
    // get voter who logged in
    getVoter(token, parseInt(voterId!))
      .then((res) => setVoter(res))
      .catch((err) => console.log(err));

    // get selected ballot
    getBallot(token, parseInt(ballotId!))
      .then((res) => {setBallot(res);
      setOffice(res.Office)})
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
    let list = document.getElementsByClassName("vote-btn");
    console.log(list.length);
    for (let i = 0; i < list.length; i++){
      list[i].className = "btn btn-outline btn-accent btn-sm vote-btn test";
    }

    buttons.forEach((i, s) => {
      // setButtons.set(i, "Unselected");
      // buttons.set(s, "Unselected");
      console.log(s)
      // setButtons(btns => btns.set(s, "Unselected"))
    })
    // to do - unselect all buttons (how the fk do i select all buttons)
  };

  // handle for Select button
  const handleSelect = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, candidate: Candidate, officeName: string) => {
    updateButton(e, candidate.id);
  };

  let previousSelect: React.MouseEvent<HTMLButtonElement, MouseEvent>;
  let previousSelectId: number = -1;
  // changeButtonAttribute
  const updateButton = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: number) => {

    // update button text
    if (buttons.get(id) === "Unselected") {
      buttons.set(id, "Selected")
      e.currentTarget.innerText = "Selected";
      e.currentTarget.className = "btn m-2 btn-accent btn-sm vote-btn";

      if(previousSelect){
        previousSelect.currentTarget.innerText = "Unselected";
        previousSelect.currentTarget.className = "btn btn-outline btn-accent btn-sm vote-btn"
      }
    }
    else {
      buttons.set(id, "Unselected")
      e.currentTarget.innerText = "Unselected";
      e.currentTarget.className = "btn btn-outline btn-accent btn-sm vote-btn"
    }

    // if(e.currentTarget.parentElement.ele
    // to do - uncolored the other buttons in same row if its on president or vice president row
  }

  // handle for Vote button
  const handleVote = (e: { preventDefault: () => void }) => {

    // wrap into bodyForm
    type BodyForm = {
      voted: boolean;
      result: string;
      isWriteIn: boolean;
      ballotId: number;
    };

    // create result
    const result = getResult()

    // create bodyForm object
    let bodyForm: BodyForm = {
      voted: true,
      result: result,
      isWriteIn: true,
      ballotId: parseInt(ballotId!),
    };

    // add the vote to database
    createVote(token, bodyForm)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    // process to the confirmation page
    router.push('/voter/vote/review');
  };

  const getResult = () => {

    // to do - iternate through buttons and update the selected positions

    return "{\"result\": {" +
      "\"President\": " + selectedPresidentId + "," +
      "\"Vice President\": " + selectedVicePresidentId + "," +
      "\"Secretary\": [" + secretariesId + "]," +
      "\"Treasurer\": [" + treasurersId + "]" +
      "}}"
  };

  // to do - put all buttons into an array for calling all buttons to set unselect when handleClear() is called
  const addButtonElementToArray = (e: React.SyntheticEvent<HTMLButtonElement>) => {
    elements.push(e.currentTarget);
  }


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
              {office.Candidate?.map((candidate) => (buttons.set(candidate.id, "Unselected"),
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
                    onClick={(e) => handleSelect(e, candidate, office.name)}
                    className="btn btn-outline btn-accent btn-sm vote-btn">
                    {buttons.get(candidate.id)}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}

      <div className="review fixed bottom-3 right-3">
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
