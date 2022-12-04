'use client';

import { useEffect, useState } from 'react';
import { Ballot } from '#/lib/model/Ballot';
import { getBallot, getBallotVoteResults } from '#/lib/api/ballot';
import { useRouter } from 'next/navigation';

type Params = {
  ballotId: string;
};

const token = sessionStorage.getItem('token') || '';

export default function DetailsBallot({ params }: { params: Params }) {
  const { ballotId } = params;
  const [ballot, setBallot] = useState<Ballot>();
  const [voteResult, setVoteResult] = useState<any>();
  const router = useRouter();

  useEffect(() => {
    getBallot(token, parseInt(ballotId)).then(setBallot);
    getBallotVoteResults(token, parseInt(ballotId))
      .then((res) => setVoteResult(res.result))
      .catch((err) => setVoteResult([]));
  }, [ballotId]);

  function ballotDates(ballot: Ballot) {
    return ballot?.start_date && ballot?.end_date ? (
      <>
        {ballot.start_date}&nbsp;-&nbsp;{ballot.end_date}
      </>
    ) : (
      <>Permanent</>
    );
  }
  console.log(voteResult);

  return (
    <>
      <div>
        <button
          className="btn-primary btn-sm btn text-white"
          onClick={() => router.back()}
        >
          Back
        </button>
      </div>
      <div className="grid gap-4">
        {/* Ballot Information */}
        <div className="card w-full bg-base-100 text-center shadow-xl">
          <div className="card-body">
            <h2 className="card-title justify-center text-3xl">
              {ballot?.name}
            </h2>
            <h4 className="card-subtitle text-gray-800">
              Society:&nbsp;{ballot?.society.name}
            </h4>
            <h4 className="card-subtitle text-gray-500">
              Date:&nbsp;{ballotDates(ballot as Ballot)}
            </h4>
            <p className="card-text">
              Total number of voters:&nbsp;
              <span className="badge-primary badge badge-lg">
                {ballot?._count.Vote}
              </span>
            </p>
            {/* <p>
              Status:&nbsp;
              <span className="badge badge-error badge-lg">Incomplete</span>
            </p> */}
          </div>
        </div>

        {/* Ballot Chart Widget */}
        <div className="card w-full bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-2xl">Vote Results</h2>
            <h4 className="card-subtitle text-gray-500">
              {voteResult?.length
                ? 'The results of ballot are as follows'
                : 'No votes yet'}
            </h4>
            {voteResult?.length > 0 && (
              <div className="rounded-lg p-4 shadow-lg">
                {/* TODO: Loop code here for title */}

                {voteResult?.map((r: any, index: number) => (
                  <>
                    <div
                      key={index}
                      className="mb-4 rounded-md p-2 pb-4 ring-2"
                    >
                      <h1 className="mb-2 text-lg font-bold capitalize">
                        {r.office}
                      </h1>
                      <div className="grid gap-4">
                        {/* TODO: Loop code here for candidates */}
                        {r.candidates.map((c: any, index: number) => (
                          <>
                            <div
                              className="md:justify-none flex justify-between rounded-md p-2 shadow-lg ring-2 lg:ml-8"
                              key={index}
                            >
                              <div className="md:w-60">{c.full_name}</div>
                              <div className="hidden w-full md:block">
                                <progress
                                  className="progress progress-primary"
                                  value={c.votes}
                                  max={r.total}
                                />
                              </div>
                              <div className="text-center md:w-24">
                                <span className="badge-secondary badge badge-lg text-white">
                                  {c.votes}
                                </span>
                              </div>
                            </div>
                          </>
                        ))}
                      </div>
                    </div>
                  </>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
