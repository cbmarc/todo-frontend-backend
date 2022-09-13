import { PrismaClient } from '@prisma/client';
import { TodoRequest } from '@todo-frontend-backend/api-interfaces';
import { Router } from 'express';
import { TodoUrlParams } from '../types/TodoTypes';

export const todosRouter = Router();

const prisma = new PrismaClient();

todosRouter.get('/todos', async (req, res) => {
  const auth = req.auth;
  const todos = await prisma.todo.findMany({
    where: {
      userId: auth.userId,
    },
  });
  res.status(200).send({ todos: todos });
});

todosRouter.post('/todos', async (req, res) => {
  const { value, completed }: TodoRequest = req.body;
  const auth = req.auth;
  if (!value || completed === undefined) {
    res.status(400).send();
    return;
  }
  const todo = await prisma.todo.create({
    data: {
      value,
      completed,
      userId: auth.userId,
    },
  });
  res.status(200).send({ todo });
});

todosRouter.delete('/todos/:todoId', async (req, res) => {
  const { todoId }: TodoUrlParams = req.params;
  const auth = req.auth;
  const todo = await prisma.todo.findUnique({
    where: {
      id: todoId,
    },
  });
  if (!todo || todo.userId !== auth.userId) {
    res.status(404).send();
    return;
  }
  try {
    await prisma.todo.delete({
      where: {
        id: todoId,
      },
    });
    res.status(200).send();
  } catch (e) {
    res.status(404).send();
  }
});

todosRouter.put('/todos/:todoId', async (req, res) => {
  const { todoId }: TodoUrlParams = req.params;
  const { value, completed }: TodoRequest = req.body;
  const auth = req.auth;

  const todo = await prisma.todo.findUnique({
    where: {
      id: todoId,
    },
  });
  if (!todo || todo.userId !== auth.userId) {
    res.status(401).send();
    return;
  }
  const updated = await prisma.todo.update({
    where: {
      id: todoId,
    },
    data: { completed, value },
  });
  res.status(200).send({ todo: updated });
});
