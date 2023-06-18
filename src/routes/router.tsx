import { createBrowserRouter } from 'react-router-dom';
import RootRoute from './Root';
import App from '@/components/App';
import UserSignInForm from '@/components/forms/UserSignInForm';
import UserSignUpForm from '@/components/forms/UserSignUpForm';
import Auth from './Auth';
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
        element: <SignIn />,
      },
      { path: 'sign-up', element: <UserSignUpForm /> },
    ],
  },
]);

export default router;
