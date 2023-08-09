import { PropsWithChildren } from 'react';

export default function Container({ children }: PropsWithChildren) {
  return (
    <div className="dark:bg-mirage-600 bg-white">
      <div className="container mx-auto">
        <div className="flex justify-center items-center min-h-screen">{children}</div>
      </div>
    </div>
  );
}
