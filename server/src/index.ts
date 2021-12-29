require('dotenv').config();
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import { buildSchema } from 'type-graphql';

const main = async () => {
  await createConnection();
  const app = express();

  app.use(
    cors({
      origin: 'http://localhost:3000',
      credentials: true,
    })
  );

  app.use(cookieParser());
  app.get('/', (_, res) => res.send('Apollo Instagram API'));

  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers: [`${__dirname}/resolvers/**/*.{ts,js}`],
    }),
    context: ({ res, req }) => ({ res, req }),
  });

  server.applyMiddleware({ app, path: '/api', cors: false });

  const PORT = process.env.PORT;

  app.listen(PORT, () => {
    console.log(`[app]: running at http://localhost:${PORT}/api`);
  });
};

main().catch((error) => console.log('Root Error', error));
