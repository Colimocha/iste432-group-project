import { Ballot } from './Ballot';
import { Candidate } from './Candidate';

export interface Office {
  id: number;
  name: string;
  limit: number;
  ballotId: number;
  ballot: Ballot;
  Candidate?: Candidate[];
  createdAt: string;
  updatedAt: string;
}

export interface EditOffice {
  name: string;
  limit: number;
  ballotId: number;
}

export interface CreateOffice {
  name: string;
  limit: number;
  ballotId: number;
}
