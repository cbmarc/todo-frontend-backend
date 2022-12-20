import { Todo } from '@prisma/client';
import {
  AuthenticationRequest,
  TodoRequest,
} from '@todo-frontend-backend/api-interfaces';
import * as bcrypt from 'bcrypt';
import * as supertest from 'supertest';

import { app } from '../server';
import { prismaMock } from './../singleton';

const request = supertest(app);

let token = '';
beforeAll(async () => {
  const hash = bcrypt.hashSync('12345', 10);
  prismaMock.user.findFirst.mockResolvedValue({
    id: 'user-id',
    name: 'some-name',
    email: 'some@email.com',
    password: hash,
  });
  const t = await prismaMock.user.findFirst({
    where: {
      email: 'some@email.com',
    },
  });
  console.log(t);
  const loginReq: AuthenticationRequest = {
    username: 'test@test.com',
    password: '12345',
  };
  const response = await request.post('/login').send(loginReq);
  console.log(response.status);
});

it('should create new todo', async () => {
  const todo: Todo = {
    id: 'some-id',
    completed: true,
    userId: 'some-user-id',
    value: 'Hello',
  };
  prismaMock.todo.create.mockResolvedValue(todo);

  const todoRequest: TodoRequest = {
    value: 'Hello',
    completed: true,
  };
  const res = await request.put('/todo').send(todoRequest);
});
