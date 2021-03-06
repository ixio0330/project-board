export interface Board {
  id: number;
  user_id: string;
  title: string;
  content: string;
  status: BoardStatus;
  created_on: string;
  updated_on?: string;
}

export enum BoardStatus {
  PRIVATE = 'PRIVATE',
  PUBLIC = 'PUBLIC',
}
