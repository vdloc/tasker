import CardLayout from '@/layout/CardLayout';
import { Outlet } from 'react-router-dom';

export default function RootRoute() {
  return (
    <CardLayout>
      <Outlet />
    </CardLayout>
  );
}
