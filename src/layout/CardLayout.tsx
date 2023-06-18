import { PropsWithChildren } from 'react';

export default function CardLayout({ children, ...otherProps }: PropsWithChildren) {
  return (
    <div className="container mx-auto bg-white">
      <div className="flex justify-center items-center min-h-screen">
        <main className="w-[30rem] relative z-10 px-4 rounded-2xl bg-white shadow-2xl drop-shadow-2xl " {...otherProps}>
          {children}
        </main>
      </div>
    </div>
  );
}
