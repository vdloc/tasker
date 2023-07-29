import { Dialog, Transition } from '@headlessui/react';
import { Fragment, JSX } from 'react';

type DialogPopUpProps = {
  isOpen: boolean;
  onClose: () => void;
  children: JSX.Element;
};

export default function DialogPopup({ isOpen, onClose, children }: DialogPopUpProps) {
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="fixed w-screen h-screen top-0 left-0 z-20" onClose={onClose}>
        <div className="bg-indigo-400 opacity-40 absolute w-full h-full"></div>
        <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100%-2rem)] md:w-[25rem] z-30">
          <Transition.Child
            as={Fragment}
            enter="transform transition ease-in-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-1"
            leave="transform transition ease-in-out duration-300"
            leaveFrom="opacity-1"
            leaveTo="opacity-0"
          >
            <Dialog.Panel className="pointer-events-auto h-full rounded-lg">{children}</Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
