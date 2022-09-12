import * as express from 'express';
import { Message } from '@todo-frontend-backend/api-interfaces';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { environment } from './environments/environment';

const prisma = new PrismaClient();

const app = express();
app.use(express.json());

const greeting: Message = { message: 'Welcome to api!' };

app.get('/api', (req, res) => {
  res.send(greeting);
});

app.post('/login', async (req, res) => {
  const { body } = req;
  if (!body.user || !body.password) {
    res.status(400).send('User or password are required.');
    return;
  }
  const user = await prisma.user.findUnique({
    where: {
      id: body.user,
    },
  });
  if (!user) {
    res.status(401).send('Unauthorized');
    return;
  }
  return bcrypt
    .compare(body.password, user.password)
    .then((value) => {
      const jwtSecret = environment.jwtSecret;
      const jwtData = {
        date: new Date().toISOString(),
        userId: user.id,
      };
      const jwtToken = jwt.sign(jwtData, jwtSecret);
      if (value === false) {
        res.status(401).send('Unauthorized');
        return;
      }
      res.status(200).send({
        accessToken: jwtToken,
      });
    })
    .catch(() => res.status(401).send('Unauthorized'));
});

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log('Listening at http://localhost:' + port + '/api');
});
server.on('error', console.error);
