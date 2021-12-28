import { ArgsType, Field, ObjectType } from 'type-graphql';
import { FieldError } from '../types';
import { User } from '../entities/User';

@ObjectType()
export class RegisterResponse {
  @Field()
  ok: boolean;

  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];
}

@ObjectType()
export class LoginResponse extends RegisterResponse {
  @Field(() => User, { nullable: true })
  user?: User;
}

@ArgsType()
export class RegisterVariables {
  @Field()
  username: string;

  @Field()
  email: string;

  @Field()
  password: string;
}
