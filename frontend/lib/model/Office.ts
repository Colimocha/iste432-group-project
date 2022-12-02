import { Ballot } from './Ballot';

export interface Office {
  id: number;
  name: string;
  ballotId: number;
  ballot: Ballot;
  createdAt: string;
  updatedAt: string;
}

export interface EditOffice {
  name: string;
  ballotId: number;
}

export interface CreateOffice {
  name: string;
  ballotId: number;
}
