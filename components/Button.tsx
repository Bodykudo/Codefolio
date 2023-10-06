import { MouseEventHandler } from 'react';
import Image from 'next/image';

type Props = {
  title: string;
  type?: 'submit' | 'reset' | 'button';
  leftIcon?: string | null;
  rightIcon?: string | null;
  handleClick?: MouseEventHandler;
  isDisabled?: boolean;
  bgColor?: string;
  textColor?: string;
};

export default function Button({
  title,
  type,
  leftIcon,
  rightIcon,
  handleClick,
  isDisabled,
  bgColor = 'bg-primary-purple',
  textColor,
}: Props) {
  return (
    <button
      type={type || 'button'}
      disabled={isDisabled}
      className={`flex items-center justify-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all max-md:w-full ${
        isDisabled ? `${bgColor}/70` : bgColor
      } ${textColor || 'text-white'}
      ${!isDisabled && `hover:${bgColor}/90`}
      
      `}
      onClick={handleClick}
    >
      {leftIcon && (
        <Image src={leftIcon} width={14} height={14} alt={`${title} icon`} />
      )}
      {title}
      {rightIcon && (
        <Image src={rightIcon} width={14} height={14} alt={`${title} icon`} />
      )}
    </button>
  );
}
