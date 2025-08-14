'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface CustomButtonProps {
  text?: string;
  variant?:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  fullWidth?: boolean;
  icon?: string;
  iconPosition?: 'left' | 'right';
  href?: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

export const CustomButton: React.FC<CustomButtonProps> = ({
  text = 'Clique aqui',
  variant = 'default',
  size = 'default',
  fullWidth = false,
  icon,
  iconPosition = 'left',
  href,
  onClick,
  className,
  disabled = false,
}) => {
  const buttonContent = (
    <>
      {icon && iconPosition === 'left' && (
        <span className="mr-2" dangerouslySetInnerHTML={{ __html: icon }} />
      )}
      {text}
      {icon && iconPosition === 'right' && (
        <span className="ml-2" dangerouslySetInnerHTML={{ __html: icon }} />
      )}
    </>
  );

  const buttonProps = {
    variant,
    size,
    className: cn(fullWidth && 'w-full', className),
    disabled,
    onClick,
  };

  if (href) {
    return (
      <Button asChild {...buttonProps}>
        <a href={href} target={href.startsWith('http') ? '_blank' : undefined}>
          {buttonContent}
        </a>
      </Button>
    );
  }

  return <Button {...buttonProps}>{buttonContent}</Button>;
};

export default CustomButton;
