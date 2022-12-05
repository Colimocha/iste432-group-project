export interface Employee {
  id: number;
  username: string;
  createdAt: string;
}

export interface EditEmployee {
  username: string;
  password?: string;
}

export interface CreateEmployee {
  username: string;
  password: string;
}
