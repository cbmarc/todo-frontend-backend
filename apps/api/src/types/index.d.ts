import { AuthHolder } from '@todo-frontend-backend/api-interfaces';

export {};

declare global {
  namespace Express {
    interface Request {
      auth: AuthHolder;
    }
  }
}
