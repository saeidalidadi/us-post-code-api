export interface User {
  username: string;
  id: number;
}

export interface AuthenticatedRequest extends Request {
  user: User;
}
