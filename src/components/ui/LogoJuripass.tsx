import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface LogoJuripassProps {
  variant?: 'full' | 'icon' | 'horizontal';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: 'default' | 'white';
  clickable?: boolean;
  className?: string;
}

const sizeClasses = {
  full: {
    sm: 'h-8',
    md: 'h-10',
    lg: 'h-12',
    xl: 'h-16'
  },
  icon: {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16'
  },
  horizontal: {
    sm: 'h-8',
    md: 'h-10',
    lg: 'h-12',
    xl: 'h-14'
  }
};

export function LogoJuripass({
  variant = 'full',
  size = 'md',
  color = 'default',
  clickable = false,
  className
}: LogoJuripassProps) {
  const logoSrc = `/images/branding/juripass-logo-${variant}${color === 'white' ? '-white' : ''}.svg`;
  
  const logoImg = (
    <img
      src={logoSrc}
      alt="Juripass - Segurança jurídica na palma da sua mão"
      className={cn(
        sizeClasses[variant][size],
        'object-contain',
        className
      )}
      loading="eager"
    />
  );

  if (clickable) {
    return (
      <Link 
        to="/dashboard" 
        className="transition-opacity hover:opacity-80 focus:opacity-80 focus:outline-none focus:ring-2 focus:ring-juripass-primary focus:ring-offset-2 rounded"
        aria-label="Ir para o dashboard"
      >
        {logoImg}
      </Link>
    );
  }

  return logoImg;
}
