'use client';
import { getBallot } from '#/lib/api/ballot';
import { createVote } from '#/lib/api/vote';
import { Ballot } from '#/lib/model/Ballot';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import React from 'react';
import LogoutButton from '#/components/LogoutButton';
import clsx from 'clsx';
import Image from 'next/image';
import { delay } from '#/lib/delay';

const token = sessionStorage.getItem('token') || '';
const ballotId = sessionStorage.getItem('ballotId') || '';

export default function Page() {
  const [ballot, setBallot] = useState<Ballot>();
  const [map, setMap] = useState<Map<any, any>>(new Map());
  const router = useRouter();
  const [loading, setLoading] = useState(false);

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
        map.get(office.name)!['limit'] = office.limit;
        map.get(office.name)!['total_selected'] = 0;
      }
    }
    return map;
  };

  useEffect(() => {
    getBallot(token, parseInt(ballotId!)).then((res) => {
      setBallot(res);
      setMap(convertMap(res));
    });
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

    setLoading(true);
    // add the vote to database
    createVote(token, bodyForm).then((res) => {
      delay()
        .then(() => router.push('/voter/vote/confirmed/' + res.id))
        .finally(() => setLoading(false));
    });
  };

  const getResult = () => {
    return JSON.stringify(
      Array.from(map).reduce(
        (acc, [key, value]) => ({
          ...acc,
          [key]: Object.keys(value)
            .filter((k) => k !== 'total_selected')
            .filter((k) => value[k].selected)
            .map((k) => parseInt(k)),
        }),
        {},
      ),
    );
  };

  return (
    <div className="bg-gray-200">
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
          <div className="whiteBackground m-3 w-1/2 rounded-md bg-[#fafaf9] p-4">
            <div className="sectionTitle m-2 text-center text-3xl font-bold">
              {office.name}
            </div>
            <div className="text-center font-bold italic text-gray-500">
              {office.limit > 1
                ? `Please pick ${office.limit} or less candidates`
                : 'Please pick ONE candidate'}
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {office.Candidate?.map((candidate) => (
                <div
                  key={candidate.id}
                  className="rounded-box mx-2 grid w-72 flex-shrink-0 place-items-center items-center gap-4 bg-base-100 p-4 py-8 shadow-xl xl:mx-0 xl:w-full"
                >
                  <div className="avatar">
                    <div className="mask mask-squircle h-24 w-24 bg-base-content bg-opacity-10 p-px">
                      <Image
                        src={candidate.image}
                        width={100}
                        height={100}
                        className="mask mask-squircle"
                        alt={candidate.firstName}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="text-center">
                      <div className="text-lg font-extrabold">
                        {candidate.firstName} {candidate.lastName}
                      </div>
                      <div className="my-3 text-sm capitalize text-base-content/70">
                        {candidate.title}
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
                    onClick={() => {
                      if (
                        map.get(office.name).total_selected >= office.limit &&
                        !map.get(office.name)[candidate.id].selected
                      ) {
                        alert('You have reached the limit');
                        return;
                      }

                      setMap((prev) =>
                        new Map(prev).set(office.name, {
                          ...prev.get(office.name),
                          total_selected: prev.get(office.name)[candidate.id]
                            .selected
                            ? prev.get(office.name).total_selected - 1
                            : prev.get(office.name).total_selected + 1,
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

      <div className="rounded-box fixed bottom-3 right-3 bg-white p-4">
        <h1 className="text-xl font-extrabold">Result</h1>
        <div className="rounded-box w-60 bg-base-100 p-4 shadow-xl">
          <div>
            {Array.from(map).map(([key, value]) => (
              <div key={key}>
                <div className="text-left">
                  <div className="text-lg font-bold">{key}</div>
                  <div className="my-3 text-sm capitalize text-base-content/70">
                    {Object.keys(value)
                      .filter((k) => k !== 'total_selected')
                      .filter((k) => value[k].selected)
                      .map((k) => value[k].full_name)
                      .join(', ')}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-4 flex justify-around">
          <button
            className="btn-ghost btn-sm btn"
            onClick={() => {
              setMap(new Map(convertMap(ballot!)));
            }}
          >
            Clear
          </button>

          <button
            className={clsx('btn-primary btn-sm btn text-white', {
              loading: loading,
            })}
            onClick={handleVote}
          >
            Vote
          </button>
        </div>
      </div>
    </div>
  );
}
