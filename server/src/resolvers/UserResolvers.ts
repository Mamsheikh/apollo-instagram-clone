import {
  Arg,
  Args,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from 'type-graphql';
import {
  LoginResponse,
  RegisterResponse,
  RegisterVariables,
} from '../types/types';
import { isUser } from './../middlewares/isUser';
import { Profile } from '../entities/Profile';
import { User } from '../entities/User';
import { validate } from 'class-validator';
import { formatErrors } from '../lib/utils';
import { createTokenCookie } from '../utils/tokenHandler';
import { MyContext } from '../types';
import { COOKIE_NAME } from '../constants';
// import {formatErrors} from '../../lib/utils'

@Resolver(User)
export class UserResolver {
  @Query(() => User, { nullable: true })
  getUser(@Arg('username') username: string) {
    return User.findOne({ username });
  }

  @Query(() => User, { nullable: true })
  @UseMiddleware(isUser)
  me(@Ctx() { res }: MyContext) {
    return User.findOne({ username: res.locals.username });
  }

  @Mutation(() => RegisterResponse)
  async register(
    @Args() { email, username, password }: RegisterVariables
  ): Promise<RegisterResponse> {
    let errors = [];
    const userEmail = await User.findOne({ email });
    const userUsername = await User.findOne({ username });

    if (userEmail) {
      errors.push({ path: 'email', message: 'Email is already registered' });
    }
    if (userUsername) {
      errors.push({ path: 'username', message: 'Username is already taken' });
    }

    if (errors.length > 0) {
      return {
        ok: false,
        errors,
      };
    }
    const user = await User.create({ email, username, password });
    errors = await validate(user);
    if (errors.length > 0) {
      return {
        ok: false,
        errors: formatErrors(errors),
      };
    }
    try {
      await user.save();
      await Profile.create({ username: user.username }).save();

      return { ok: true };
    } catch (error) {
      console.log('Register error', error);
      return {
        ok: false,
        errors: [{ path: 'Root Error', message: 'Unkown error' }],
      };
    }
  }

  @Mutation(() => LoginResponse)
  async login(
    @Ctx() { res }: MyContext,
    @Arg('usernameOrEmail') usernameOrEmail: string,
    @Arg('password') password: string
  ): Promise<LoginResponse> {
    try {
      const user = await User.findOne(
        usernameOrEmail.includes('@')
          ? { where: { email: usernameOrEmail } }
          : { where: { username: usernameOrEmail } }
      );

      if (!user) {
        return {
          ok: false,
          errors: [{ path: 'usernameOrEmail', message: 'User does not exist' }],
        };
      }

      const valid = await user.verifyPassword(password);
      if (!valid) {
        return {
          ok: false,
          errors: [{ path: 'password', message: 'Incorrect Password' }],
        };
      }

      createTokenCookie(user, res);
      return { ok: true, user };
    } catch (error) {
      return { ok: false };
    }
  }

  //Logout
  @Mutation(() => Boolean)
  logout(@Ctx() { res }: MyContext) {
    return new Promise((resolve) => {
      res.clearCookie(COOKIE_NAME);

      resolve(true);
    });
  }
}
