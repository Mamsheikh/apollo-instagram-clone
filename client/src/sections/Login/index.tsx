import { Formik, Form } from 'formik';
import { Link, RouteComponentProps } from 'react-router-dom';
import { AiFillFacebook } from 'react-icons/ai';
import logoLight from './assets/logo-light.png';
import appStore from './assets/app-store.png';
import playStore from './assets/gg-play.png';
import { ButtonLoader, InputField } from '../../lib/components';
import { useLoginMutation } from '../../generated/graphql';

export const Login: React.FC<RouteComponentProps> = ({ history }) => {
  const [login] = useLoginMutation();
  return (
    <div className=' bg-[#FAFAFA] p-8 flex justify-center'>
      <div className='max-w-md w-full'>
        <div className='small:bg-white small:p-8 small:border space-y-2'>
          <div className='my-6 flex items-center justify-center'>
            <img className='h-14 w-auto' src={logoLight} alt='' />
          </div>
          <Formik
            initialValues={{ usernameOrEmail: '', password: '' }}
            onSubmit={async (
              { usernameOrEmail, password },
              { setFieldError }
            ) => {
              try {
                const { data } = await login({
                  variables: { usernameOrEmail, password },
                });
                if (data?.login.errors) {
                  data.login.errors.forEach(({ path, message }) => {
                    setFieldError(path, message);
                  });
                }
                if (data?.login.ok) {
                  history.push('/');
                }
              } catch (error) {}
            }}
          >
            {({ isSubmitting, values: { usernameOrEmail, password } }) => (
              <Form className='mb-3'>
                <InputField
                  placeholder='Username or Email'
                  name='usernameOrEmail'
                />
                <InputField
                  placeholder='Password'
                  type='password'
                  name='password'
                />

                <button
                  className={`${
                    !usernameOrEmail || !password
                      ? 'cursor-not-allowed opacity-40'
                      : ''
                  } my-4 block w-full rounded bg-blue-500 hover:bg-blue-400 transform  p-1 text-white`}
                >
                  {isSubmitting ? (
                    <ButtonLoader color='light' />
                  ) : (
                    <span>Log In</span>
                  )}
                </button>
              </Form>
            )}
          </Formik>
          <div className='mt-4'></div>
          <div className='mt-4 border-t'>
            <button className='mt-4 flex items-center border p-1 text-blue-600 font-semibold w-full justify-center'>
              <AiFillFacebook className='mr-2 text-blue-500' /> Login with
              facebook
            </button>
          </div>
          <Link
            to='#'
            className='pt-4 text-gray-700 text-xs flex items-center justify-center'
          >
            Forgot Password?
          </Link>
        </div>
        <div className='small:bg-white small:border small:p-4 pt-6 mt-4'>
          <span className='text-sm text-gray-700 flex items-center justify-center'>
            Don't have an accout?{' '}
            <Link to='/register' className='ml-1 text-blue-700'>
              Sign up
            </Link>
          </span>
        </div>
        <span className='pt-6 text-sm text-gray-700 flex items-center justify-center'>
          Get the app.
        </span>
        <div className='pt-2 flex items-center justify-center space-x-2'>
          <div className=''>
            <img className='w-32' src={appStore} alt='' />
          </div>
          <div>
            <img className='w-32' src={playStore} alt='' />
          </div>
        </div>
      </div>
    </div>
  );
};
