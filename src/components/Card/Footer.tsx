import React from 'react';
import Button from '../Button';

const CardFooter = React.memo(function CardFooter() {
  return (
    <div className='px-4 py-4 sm:px-6'>
      <div className='flex gap-4 justify-end'>
        <Button label='Edit Tags' size='large' rounded={true} />
        <Button label='Completed Tasks' size='large' rounded={true} />
      </div>
    </div>
  );
});

export default CardFooter;
