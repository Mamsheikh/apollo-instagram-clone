require('dotenv').config();
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import { buildSchema } from 'type-graphql';

const main = async () => {
  await createConnection();
  const app = express();

  app.get('/', (_, res) => res.send('Apollo Instagram API'));

  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers: [`${__dirname}/resolvers/**/*.{ts,js}`],
    }),
  });

  server.applyMiddleware({ app, path: '/api' });

  const PORT = process.env.PORT;

  app.listen(PORT, () => {
    console.log(`[app]: running at http://localhost:${PORT}/api`);
  });
};

main().catch((error) => console.log('Root Error', error));
