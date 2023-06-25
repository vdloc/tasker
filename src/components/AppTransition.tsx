import { Transition } from '@headlessui/react';
import { PropsWithChildren, useEffect, useState } from 'react';

export default function AppTransition({ children }: PropsWithChildren) {
  const [isShow, setShow] = useState(false);
  useEffect(() => {
    setShow(true);
    return () => {
      setShow(false);
    };
  }, []);
  return (
    <Transition
      show={isShow}
      enter="transition duration-500 ease-in-out"
      enterFrom="opacity-0 scale-0"
      enterTo="opacity-100 scale-100"
      leave="transition duration-500 ease-in-out"
      leaveFrom="opacity-100 scale-100"
      leaveTo="opacity-0 scale-0"
    >
      {children}
    </Transition>
  );
}
