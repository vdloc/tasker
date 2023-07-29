import Container from '@/layout/Container';
import configs from '@data/configs.json';
import { Helmet } from 'react-helmet';
import { Outlet } from 'react-router-dom';

const {
  app: { name, description },
} = configs;

export default function RootRoute() {
  return (
    <Container>
      <Helmet>
        <title>{name}</title>
        <meta name="description" content={description} />
      </Helmet>
      <Outlet />
    </Container>
  );
}
