'use client';
import { getVoter } from '#/lib/api/voter';
import { getBallot } from '#/lib/api/ballot';
import { Voter } from '#/lib/model/Voter';
import { createVote } from '#/lib/api/vote';
import { Ballot } from '#/lib/model/Ballot';
import { Candidate } from '#/lib/model/Candidate';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import React from 'react';
import { Office } from '#/lib/model/Office';
import LogoutButton from '#/components/LogoutButton';
import clsx from 'clsx';

interface ListOC {
  office: string;
  candidates: [
    {
      id: number;
      full_name: string;
      selected: boolean;
    },
  ];
}

const token = sessionStorage.getItem('token') || '';
const voterId = sessionStorage.getItem('voterId') || '';
const ballotId = sessionStorage.getItem('ballotId') || '';

export default function Page() {
  const [ballot, setBallot] = useState<Ballot>();
  const [map, setMap] = useState<Map<any, any>>(new Map());
  const router = useRouter();

  let selectedPresident = 'asdasdasdasdasd';
  let selectedVicePresident = 'tesasdasdasdasdt';
  let treasurers = ['test', 'tesasdasdasdt'];
  let secretaries = ['test', 'teasdasdasdasdst', 'tesasdasdaaasadt'];

  let selectedPresidentId = 6;
  let selectedVicePresidentId = 7;
  let treasurersId = [3, 4];
  let secretariesId = [3, 4];

  const convertMap = (ballot: Ballot) => {
    const map = new Map();
    if (!ballot?.Office) return map;
    const offices = ballot.Office!;
    for (const office of offices) {
      map.set(office.name, {});
      for (const candidate of office.Candidate!) {
        map.get(office.name)![candidate.id] = {
          id: candidate.id,
          full_name: `${candidate.firstName} ${candidate.lastName}`,
          selected: false,
        };
      }
    }
    return map;
  };

  useEffect(() => {
    // get selected ballot
    getBallot(token, parseInt(ballotId!))
      .then((res) => {
        setBallot(res);
        setMap(convertMap(res));
      })
      .catch((err) => console.log(err));
  }, []);

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
    const result = getResult();

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

    return (
      '{"result": {' +
      '"President": ' +
      selectedPresidentId +
      ',' +
      '"Vice President": ' +
      selectedVicePresidentId +
      ',' +
      '"Secretary": [' +
      secretariesId +
      '],' +
      '"Treasurer": [' +
      treasurersId +
      ']' +
      '}}'
    );
  };

  return (
    <div className="container mx-auto bg-gray-200">
      {/* top bar */}
      <div className="... flex flex-row-reverse bg-blue-400 p-2">
        <LogoutButton />
      </div>
      {/* end of top bar */}

      {/* ballot name */}
      <div className="content flex items-center justify-center">
        <div className="whiteBackground w-1/2 p-5 text-center text-4xl font-bold">
          {ballot?.name} Ballot
        </div>
      </div>
      {/* end of ballot name */}

      {ballot?.Office?.map((office, index) => (
        <div className="content flex items-center justify-center" key={index}>
          <div className="whiteBackground m-3 w-1/2 rounded-md bg-[#fafaf9] p-3">
            <div className="sectionTitle m-2 text-center text-3xl font-bold">
              {office.name}
            </div>
            <div className="mt-6 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:gap-y-5">
              {office.Candidate?.map((candidate) => (
                <div
                  key={candidate.id}
                  className="rounded-box mx-2 grid w-72 flex-shrink-0 place-items-center items-center gap-4 bg-base-100 p-4 py-8 shadow-xl xl:mx-0 xl:w-full"
                >
                  <div className="avatar">
                    <div className="mask mask-squircle h-24 w-24 bg-base-content bg-opacity-10 p-px">
                      <img
                        src="https://iili.io/HfipnUl.jpg"
                        width="94"
                        height="94"
                        alt="Profile Image"
                        className="mask mask-squircle"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="text-center">
                      <div className="text-lg font-extrabold">
                        {candidate.firstName} {candidate.lastName}
                      </div>
                      <div className="my-3 text-sm text-base-content/70">
                        biography
                        <br /> {/*where is bio? */}
                        statement
                        <br /> {/*where is statement? */}
                      </div>
                    </div>
                  </div>
                  <button
                    className={clsx('btn-sm btn', {
                      'btn-primary': map.get(office.name)[candidate.id]
                        .selected,
                      'btn-outline btn-primary': !map.get(office.name)[
                        candidate.id
                      ].selected,
                    })}
                    onClick={(e) => {
                      setMap((prev) =>
                        new Map(prev).set(office.name, {
                          ...prev.get(office.name),
                          [candidate.id]: {
                            ...prev.get(office.name)[candidate.id],
                            selected: !prev.get(office.name)[candidate.id]
                              .selected,
                          },
                        }),
                      );
                    }}
                  >
                    {map.get(office.name)[candidate.id].selected === true
                      ? 'Selected'
                      : 'Unselected'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}

      <div className="review fixed bottom-3 right-3">
        <div className="rounded-box place-items-center items-center gap-4 bg-base-100 p-4 py-8 shadow-xl">
          <div>
            <div className="text-lg font-bold">President</div>
            <div className="text-sm text-base-content/70">
              &nbsp; {selectedPresident}
            </div>
            <div className="text-lg font-bold">Vice President</div>
            <div className="text-sm text-base-content/70">
              &nbsp; {selectedVicePresident}
            </div>
            <div className="text-lg font-bold">Secretaries</div>
            {secretaries.map((secretary, index) => (
              <div className="text-sm text-base-content/70" key={index}>
                &nbsp; {secretary}
              </div>
            ))}
            <div className="text-lg font-bold">Treasurers</div>
            {treasurers.map((treasurer, index) => (
              <div className="text-sm text-base-content/70" key={index}>
                &nbsp; {treasurer}
              </div>
            ))}
          </div>
        </div>

        <button className="btn-accent btn-sm btn m-2" onClick={() => {}}>
          Clear
        </button>

        <button className="btn-accent btn-sm btn" onClick={handleVote}>
          Vote
        </button>
      </div>
    </div>
  );
}
