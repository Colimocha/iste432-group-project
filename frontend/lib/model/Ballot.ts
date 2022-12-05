import { Office } from './Office';
import { Society } from './Society';
import { Vote } from './Vote';

export interface Ballot {
  id: number;
  name: string;
  allowWriteIn: boolean;
  start_date: string;
  end_date: string;
  societyId: number;
  society: Society;
  Vote?: Vote[];
  Office?: Office[];
  createdAt: string;
  _count: {
    Vote: number;
  };
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
