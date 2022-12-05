import { Ballot } from './Ballot';
import { Office } from './Office';

export interface Candidate {
  id: number;
  firstName: string;
  lastName: string;
  title: string;
  image: string;
  officeId: number;
  ballotId: number;
  createdAt: string;
  office: Office;
  ballot: Ballot;
}

export interface CreateCandidate {
  firstName: string;
  lastName: string;
  title: string;
  image: string;
  officeId: number;
  ballotId: number;
}

export interface EditCandidate {
  firstName: string;
  lastName: string;
  title: string;
  image: string;
  officeId: number;
  ballotId: number;
}
