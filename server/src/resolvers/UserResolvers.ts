import { Arg, Args, Ctx, Mutation, Resolver } from 'type-graphql';
import {
  LoginResponse,
  RegisterResponse,
  RegisterVariables,
} from '../types/types';
import { Profile, User } from '../entities';
import { validate } from 'class-validator';
import { formatErrors } from '../lib/utils';
import { createTokenCookie } from '../utils/tokenHandler';
import { MyContext } from 'src/types';
// import {formatErrors} from '../../lib/utils'

@Resolver(User)
export class UserResolver {
  @Mutation(() => RegisterResponse)
  async register(
    @Ctx() { res }: MyContext,
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
      createTokenCookie(user, res);
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

      return { ok: true, user };
    } catch (error) {
      return { ok: false };
    }
  }
}
