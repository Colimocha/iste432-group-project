import { Society } from './Society';

export interface Voter {
  id: number;
  firstName: string;
  lastName: string;
  credential_1: string;
  credential_2: string;
  dateOfBirth: string;
  societyId: number;
  createdAt: string;
  society: Society;
}

export interface CreateVoter {
  firstName: string;
  lastName: string;
  credential_1: string;
  credential_2: string;
  dateOfBirth: string;
  societyId: number;
}

export interface EditVoter {
  firstName: string;
  lastName: string;
  credential_1: string;
  dateOfBirth: string;
  societyId: number;
}
