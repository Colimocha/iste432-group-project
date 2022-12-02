import { Society } from './Society';

export interface Ballot {
  id: number;
  name: string;
  allowWriteIn: boolean;
  start_date: string;
  end_date: string;
  societyId: number;
  society: Society;
  createdAt: string;
}

export interface CreateBallot {
  name: string;
  allowWriteIn: boolean;
  start_date?: string;
  end_date?: string;
  societyId: number;
}

export interface EditBallot {
  name: string;
  allowWriteIn: boolean;
  start_date?: string;
  end_date?: string;
  societyId: number;
}
