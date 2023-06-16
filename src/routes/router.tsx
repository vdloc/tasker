import { createBrowserRouter } from 'react-router-dom';
import RootRoute from './Root';
import AppCard from '@/components/AppCard';
import LoginCard from '@/components/LoginCard';
import RegisterCard from '@/components/RegisterCard';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootRoute />,
    children: [
      {
        path: 'app',
        element: <AppCard title='The TuDu' description='Achieve your goals' />,
      },
      {
        path: 'sign-in',
        element: <LoginCard />,
      },
      { path: 'sign-up', element: <RegisterCard /> },
    ],
  },
]);

export default router;
