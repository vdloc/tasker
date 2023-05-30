import { PropsWithChildren } from 'react';
import CardHeader from './Header';
import type { CardHeaderProp } from './Header';
import CardFooter from './Footer';

type CardProps = PropsWithChildren & CardHeaderProp;

export default function Card({ children, title, description }: CardProps) {
  return (
    <div className='divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow-2xl w-[30rem]'>
      <CardHeader title={title} description={description} />
      <div className=''>{children}</div>
      <CardFooter />
    </div>
  );
}
