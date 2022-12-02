'use client';

import DetailsBallot from './DetailsBallot';
import ViewAndEditBallot from './ViewAndEditBallot';

type Params = {
  ballotId: string;
};

const role = sessionStorage.getItem('role') || '';
export default function Page(params: Params) {
  return (
    <>
      {role === 'employee' ? (
        <ViewAndEditBallot {...params} />
      ) : (
        <DetailsBallot {...params} />
      )}
    </>
  );
}
