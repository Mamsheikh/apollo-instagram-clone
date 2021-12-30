import React from 'react';
import {
  Redirect,
  Route,
  RouteComponentProps,
  RouteProps,
} from 'react-router-dom';
import { useMeQuery } from '../../../generated/graphql';
import { AppHeader } from '../../../sections';

type PrivateRouteProps = RouteProps & {
  component: React.FC<RouteComponentProps>;
};

export const PrivateRoute: React.FC<PrivateRouteProps> = ({
  component: Component,
  ...rest
}) => {
  const { data, loading } = useMeQuery();
  console.log(data?.me);
  if (loading) {
    return <h2>Loading....</h2>; //<Spinner />;
  }
  return (
    <Route
      {...rest}
      render={(props) =>
        data?.me !== null ? (
          <>
            {' '}
            <AppHeader />{' '}
            <div className='mt-20'>
              <Component {...props} />
            </div>
          </>
        ) : (
          <Redirect to='/login' />
        )
      }
    />
    // <Route
    //   {...rest}
    //   render={(props) =>
    //     data && data.me ? (
    //       <>
    //         <Navbar />
    //         <div className='mt-20'>
    //           <Component {...props} />
    //         </div>
    //       </>
    //     ) : (
    //       <Redirect to='/login' />
    //     )
    //   }
    // />
  );
};
