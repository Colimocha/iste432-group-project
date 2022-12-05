import { Society } from './Society';

export interface SocietyContact {
  id: number;
  username: string;
  societyId: number;
  createdAt: string;
  society: Society;
}

export interface EditSocietyContact {
  username: string;
  password?: string;
  societyId: number;
}

export interface CreateSocietyContact {
  username: string;
  password: string;
  societyId: number;
}
