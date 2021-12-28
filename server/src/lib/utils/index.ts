import { ValidationError } from 'class-validator';
import { FieldError } from '../../types';

export const formatErrors = (errors: ValidationError[]) => {
  let formattedErrors: FieldError[] = [];
  errors.forEach(({ property, constraints }) => {
    formattedErrors.push({
      path: property,
      message: Object.values(constraints!)[0],
    });
  });
  return formattedErrors;
};
