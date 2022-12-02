'use client';

import React from 'react';
import { Ballot } from '#/lib/model/Ballot';

export default function BallotCard({ ballot }: { ballot: Ballot }) {
  return (
    <div className="card image-full w-96 bg-base-100 shadow-xl">
      <figure>
        <img src="https://placeimg.com/400/225/arch" alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">Shoes!</h2>
        <p>If a dog chews shoes whose shoes does he choose?</p>
        <div className="card-actions justify-end">
          <button className="btn-primary btn">Enter</button>
        </div>
      </div>
    </div>
  );
}
