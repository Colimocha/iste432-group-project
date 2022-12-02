'use client';

type Params = {
  ballotId: string;
};

const token = sessionStorage.getItem('token') || '';

export default function DetailsBallot(params: Params) {
  const { ballotId } = params;
  return (
    <>
      <h1>DetailsBallot {ballotId}</h1>
    </>
  );
}
