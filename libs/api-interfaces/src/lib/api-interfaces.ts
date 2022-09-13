export interface AuthHolder {
  userId: string;
  date: string;
}

export type AuthenticationRequest = {
  username: string;
  password: string;
};

export type SignupRequest = {
  username: string;
  password: string;
  name: string;
};
export interface User {
  id: string;
  name: string;
}

export type Todo = {
  id: string;
  value: string;
  completed: boolean;
  userId: string;
};

export type TodoRequest = Omit<Todo, 'id' | 'userId'>;
