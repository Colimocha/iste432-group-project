'use client';

import { useEffect, useState } from 'react';
import { Vote } from '#/lib/model/Vote';
import { getVote } from '#/lib/api/vote';
import LogoutButton from '#/components/LogoutButton';
import { Ballot } from '#/lib/model/Ballot';
import { getBallot } from '#/lib/api/ballot';

const token = sessionStorage.getItem('token') || '';

export default function Page({ params }: { params: { voteId: string } }) {
  const { voteId } = params;
  const [data, setData] = useState<Vote>();
  const [ballot, setBallot] = useState<Ballot>();

  useEffect(() => {
    getVote(token, parseInt(voteId)).then((res) => {
      setData(res);
      getBallot(token, res.ballotId).then(setBallot);
    });
  }, [voteId]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="rounded-md bg-[#fafaf9] p-4">
        <div className="resultMessage text-center ">
          Thank you for your vote for{' '}
          <span className="font-bold">{ballot?.name}</span>!
          <br />
          Confirmation Number:{' '}
          <span className="font-bold">{data?.submit_guid}</span>
        </div>
        <div className="flex justify-center">
          <LogoutButton />
        </div>
      </div>
    </div>
  );
}
