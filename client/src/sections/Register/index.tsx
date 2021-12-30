import { Formik, Form } from 'formik';
import { Link, RouteComponentProps } from 'react-router-dom';
import { useRegisterMutation } from '../../generated/graphql';
import logoLight from './assets/insta-logo.png';
import appStore from './assets/app-store.png';
import playStore from './assets/gg-play.png';
import { AiFillFacebook, AiOutlineLoading } from 'react-icons/ai';
import { ButtonLoader, InputField } from '../../lib/components';

export const Register: React.FC<RouteComponentProps> = ({ history }) => {
  const [register] = useRegisterMutation();
  return (
    <div className=' bg-[#FAFAFA] p-8 flex justify-center'>
      <div className='max-w-md w-full'>
        <div className='small:bg-white small:p-8 small:border space-y-2'>
          <div className='my-6 flex items-center justify-center'>
            <img className='h-14 w-auto' src={logoLight} alt='' />
          </div>
          <span className='flex items-center justify-center mx-auto text-[#95A2AB] font-semibold'>
            Sign up to see photos and videos from your friends.
          </span>
          <Formik
            initialValues={{
              email: '',
              username: '',
              password: '',
              password2: '',
            }}
            onSubmit={async (
              { email, username, password, password2 },
              { setFieldError }
            ) => {
              if (password !== password2) {
                setFieldError('password2', 'Password Mismatch');
                return;
              }
              try {
                const { data } = await register({
                  variables: {
                    email,
                    username,
                    password,
                  },
                });
                if (data?.register.errors) {
                  data.register.errors.forEach(({ path, message }) => {
                    setFieldError(path, message);
                  });
                }
                if (data?.register.ok) {
                  history.push('/login');
                }
              } catch (error) {
                console.log('register', error);
              }
            }}
          >
            {({
              isSubmitting,
              values: { email, password, username, password2 },
            }) => (
              <Form className='mb-3'>
                <InputField placeholder='Email' name='email' />
                <InputField placeholder='Username' name='username' />
                <InputField
                  placeholder='Password'
                  type='password'
                  name='password'
                />
                <InputField
                  placeholder='Confirm Password'
                  type='password'
                  name='password2'
                />

                <button
                  className={`${
                    !email || !username || !password || !password2
                      ? 'cursor-not-allowed opacity-40'
                      : ''
                  } my-2 block w-full text-white bg-blue-500 p-2 rounded`}
                  type='submit'
                  // disabled={!email || !username || !password || !password2}
                >
                  {isSubmitting ? <ButtonLoader /> : <span>Sign up</span>}
                </button>
              </Form>
            )}
          </Formik>

          <div className='flex items-center justify-center'>
            <span className='text-xs text-gray-600'>
              By Signing up, You agree to our{' '}
              <span className='font-semibold'>Terms, Data Policy</span> and{' '}
              <span className='font-semibold'>Cookies Policy</span>
            </span>
          </div>
        </div>
        <div className='small:bg-white small:border small:p-4 pt-6 mt-4'>
          <span className='text-sm text-gray-700 flex items-center justify-center'>
            Have an accout?{' '}
            <Link to='/login' className='ml-1 text-blue-700'>
              Login
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
