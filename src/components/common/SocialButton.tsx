import React, { JSXElementConstructor } from 'react';

import Button from './Button';

type SocialButtonProps = {
  Icon: JSXElementConstructor<React.JSX.IntrinsicElements['svg']>;
  label: string;
} & React.JSX.IntrinsicElements['button'];

export default function SocialButton({ onClick, Icon, label }: SocialButtonProps) {
  return (
    <Button
      className="w-full justify-center"
      color="white"
      label={
        <span className="flex mx-auto justify-center">
          <span className="w-1/3">{<Icon className="w-4 h-4" />}</span>
          <span className="text-left  flex-1">
            <span className="inline-block ml-4 whitespace-nowrap">{label}</span>
          </span>
        </span>
      }
      onClick={onClick}
    ></Button>
  );
}
