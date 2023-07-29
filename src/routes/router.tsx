import App from '@/components/App';
import AppTransition from '@/components/AppTransition';
import UserSignUpForm from '@/components/forms/UserSignUpForm';
import { createBrowserRouter } from 'react-router-dom';

import Auth from './Auth';
import RootRoute from './Root';
import SignIn from './SignIn';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootRoute />,
    children: [
      {
        index: true,
        element: (
          <Auth>
            <App />
          </Auth>
        ),
      },
      {
        path: 'sign-in',
        element: (
          <AppTransition>
            <SignIn />
          </AppTransition>
        ),
      },
      {
        path: 'sign-up',
        element: (
          <AppTransition>
            {(() => (
              <UserSignUpForm />
            ))()}
          </AppTransition>
        ),
      },
    ],
  },
]);

export default router;
