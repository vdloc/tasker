import { PropsWithChildren } from 'react';

export default function Container({ children }: PropsWithChildren) {
  return (
    <div className="container mx-auto bg-white">
      <div className="flex justify-center items-center min-h-screen">{children}</div>
    </div>
  );
}
