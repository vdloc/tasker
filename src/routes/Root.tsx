import Container from '@/layout/Container';
import { Outlet } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import configs from '@data/configs.json';

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
