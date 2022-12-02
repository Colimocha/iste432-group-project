export interface Vote {
  id: number;
  voted: boolean;
  result: string;
  submit_guid: string;
  isWriteIn: boolean;
  createdAt: string;
  updatedAt: string;
  ballotId: number;
}
