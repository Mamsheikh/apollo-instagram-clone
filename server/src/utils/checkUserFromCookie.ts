import { User } from './../entities/User';
import { verifyToken } from './tokenHandler';
import { AuthenticationError } from 'apollo-server-express';
import { COOKIE_NAME } from './../constants';
import { MyContext } from './../types';

export const checkUserFromCookie = async ({ res, req }: MyContext) => {
  const token = req.cookies[COOKIE_NAME];
  if (!token) {
    console.log('Something went wrong');
    throw new AuthenticationError('unauthorized');
  }

  const { username }: any = verifyToken(token);
  if (!username) {
    console.log('something went wrong');
    throw new AuthenticationError('unauthorized');
  }
  const user = User.findOne({ username });
  if (!user) {
    throw new AuthenticationError('unauthorized');
  }
  res.locals.username = username;
  return { user };
};
