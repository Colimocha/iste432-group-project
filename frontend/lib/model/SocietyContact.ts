export interface SocietyContact {
  id: number;
  username: string;
  societyId: number;
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
