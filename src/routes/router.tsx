import { createBrowserRouter } from 'react-router-dom';
import RootRoute from './Root';
import App from '@/components/App';
import UserSignUpForm from '@/components/forms/UserSignUpForm';
import Auth from './Auth';
import SignIn from './SignIn';
import AppTransition from '@/components/AppTransition';

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
