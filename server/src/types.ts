import { Field, ObjectType } from 'type-graphql';
import { Response, Request } from 'express';
@ObjectType()
export class FieldError {
  @Field()
  path: string;

  @Field()
  message: string;
}

export interface MyContext {
  res: Response;
  req: Request;
}
