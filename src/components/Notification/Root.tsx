import { PropsWithChildren } from 'react';
import ReactDOM from 'react-dom';


export default function NotificationRoot({ children }: PropsWithChildren) {
  return ReactDOM.createPortal(
    <div
      aria-live='assertive'
      className='pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6'
    >
      <div className='flex w-full flex-col items-center space-y-4 sm:items-end'>
        {/* Notification panel, dynamically insert this into the live region when it needs to be displayed */}
        {children}
      </div>
    </div>,
    document.body
  );
}
