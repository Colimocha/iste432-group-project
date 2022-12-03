'use client';

import { useEffect, useState } from 'react';
import { Ballot } from '#/lib/model/Ballot';
import { getBallot } from '#/lib/api/ballot';
import { useRouter } from 'next/navigation';

type Params = {
  ballotId: string;
};

const token = sessionStorage.getItem('token') || '';

export default function DetailsBallot({ params }: { params: Params }) {
  const { ballotId } = params;
  const [ballot, setBallot] = useState<Ballot>();
  const router = useRouter();

  useEffect(() => {
    getBallot(token, parseInt(ballotId)).then(setBallot).catch(console.log);
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

  return (
    <>
      <div>
        <button
          className="btn btn-primary text-white btn-sm"
          onClick={() => router.back()}
        >
          Back
        </button>
      </div>
      <div className="grid gap-4">
        {/* Ballot Information */}
        <div className="card w-full bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-3xl">{ballot?.name}</h2>
            <h4 className="card-subtitle text-gray-800">
              Society:&nbsp;{ballot?.society.name}
            </h4>
            <h4 className="card-subtitle text-gray-500">
              Date:&nbsp;{ballotDates(ballot as Ballot)}
            </h4>
            <p className="card-text">
              Total Votes:&nbsp;
              <span className="badge badge-primary badge-lg">
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
              The results of ballot are as follows
            </h4>
            <div className="rounded-lg p-4 shadow-lg">
              {/* TODO: Loop code here for title */}
              <h1 className="text-lg font-bold mb-2">President</h1>
              <div className="grid gap-4">
                {/* TODO: Loop code here for candidates */}
                <div className="flex shadow-lg rounded-md p-2 lg:ml-8 ring-2 justify-between md:justify-none">
                  <div className="md:w-60">Jason Smith</div>
                  <div className="w-full hidden md:block">
                    <progress
                      className="progress progress-primary"
                      value="56"
                      max="135"
                    />
                  </div>
                  <div className="md:w-24 text-center">
                    <span className="badge badge-secondary badge-lg text-white">
                      56
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
