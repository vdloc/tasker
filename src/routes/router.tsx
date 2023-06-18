import { createBrowserRouter } from 'react-router-dom';
import RootRoute from './Root';
import App from '@/components/App';
import UserSignInForm from '@/components/forms/UserSignInForm';
import UserSignUpForm from '@/components/forms/UserSignUpForm';
import Auth from './Auth';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootRoute />,
    children: [
      {
        index: true,
        element: (
          <Auth>
            <App title="The TuDu" description="Achieve your goals" />
          </Auth>
        ),
      },
      {
        path: 'sign-in',
        element: <UserSignInForm />,
      },
      { path: 'sign-up', element: <UserSignUpForm /> },
    ],
  },
]);

export default router;
