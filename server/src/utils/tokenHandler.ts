import { Response } from 'express';
import { sign, verify } from 'jsonwebtoken';
import { COOKIE_NAME, _prod_ } from './../constants';
import { User } from '../entities/User';

export const createTokenCookie = (user: User, res: Response) => {
  res.cookie(
    COOKIE_NAME,
    sign({ username: user.username }, process.env.JWT_SECRET!, {
      expiresIn: '7d',
    }),
    {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: _prod_ ? 'none' : 'lax',
      secure: _prod_,
    }
  );
};

export const verifyToken = (token: string) => {
  return verify(token, process.env.JWT_SECRET!);
};
