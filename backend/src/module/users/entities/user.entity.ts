export type UserRole = 'admin' | 'user';

export class User {
  id: number;
  role: UserRole;
  authenticationStatus: boolean;
  userId: string;
  uesrName: string;
  email: string;
  password: string;
  created_on?: string;
  updated_on?: string;
}
