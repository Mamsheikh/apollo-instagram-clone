export const _prod_ = process.env.NODE_ENV === 'production';
export const COOKIE_NAME = 'qid';
export const EXPRESS_ENDPOINT = process.env.EXPRESS_ENDPOINT!;
export const FRONTEND_URL = 'http://localhost:3000';
export const GRAVATAR =
  'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y';
export const CLOUDINARY_ROOT_PATH = `apollo-insta/${_prod_ ? 'prod' : 'dev'}`;
