import { MyContext } from '../types';
import { checkUserFromCookie } from '../utils/checkUserFromCookie';
import { MiddlewareFn } from 'type-graphql';

export const isUser: MiddlewareFn<MyContext> = async ({ context }, next) => {
  try {
    await checkUserFromCookie(context);
  } catch (error) {
    console.log(error);
  }
  return next();
};
