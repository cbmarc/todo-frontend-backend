import {
  AuthenticationRequest,
  SignupRequest,
} from '@todo-frontend-backend/api-interfaces';
import * as bcrypt from 'bcrypt';
import * as cors from 'cors';
import * as express from 'express';
import { expressjwt } from 'express-jwt';
import helmet from 'helmet';
import * as jwt from 'jsonwebtoken';
import * as morgan from 'morgan';
import prisma from './client';

import { environment } from './environments/environment';
import { todosRouter } from './routers/todos';

export const app = express();

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(
  expressjwt({
    secret: environment.jwtSecret,
    algorithms: ['HS256'],
  }).unless({ path: ['/login', '/signup'] })
);

// TODO: refactor to extract logic and return different errors, act upon these in the api
// then, testing will become much easier
app.post('/login', async (req, res) => {
  const { username, password }: AuthenticationRequest = req.body;
  if (!username || !password) {
    res.status(400).send('User or password are required.');
    return;
  }
  const user = await prisma.user.findFirst({
    where: {
      email: username,
    },
  });

  if (!user) {
    res.status(401).send('Unauthorized');
    return;
  }
  return bcrypt
    .compare(password, user.password)
    .then((value) => {
      if (value === false) {
        res.status(401).send('Unauthorized');
        return;
      }
      const jwtData = {
        date: new Date().toISOString(),
        userId: user.id,
      };
      const jwtToken = jwt.sign(jwtData, environment.jwtSecret, {
        expiresIn: '8h',
      });
      res.status(200).send({
        accessToken: jwtToken,
      });
    })
    .catch(() => res.status(401).send('Unauthorized'));
});

app.post('/signup', async (req, res) => {
  const { username, password, name }: SignupRequest = req.body;
  if (!username || !password) {
    res.status(400).send('User or password are required.');
    return;
  }
  const user = await prisma.user.findFirst({
    where: {
      email: username,
    },
  });
  if (user) {
    res.status(401).send('Unauthorized');
    return;
  }
  const hash = bcrypt.hashSync(password, 10);
  await prisma.user.create({
    data: {
      email: username,
      password: hash,
      name: name,
    },
  });
  res.status(200).send();
});

app.use(todosRouter);
