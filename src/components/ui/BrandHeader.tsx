import React from 'react';
import { LogoJuripass } from './LogoJuripass';

interface BrandHeaderProps {
  title?: string;
  subtitle?: string;
  showLogo?: boolean;
  logoSize?: 'sm' | 'md' | 'lg' | 'xl';
}

export function BrandHeader({
  title,
  subtitle,
  showLogo = true,
  logoSize = 'lg'
}: BrandHeaderProps) {
  return (
    <div className="flex flex-col items-center text-center space-y-4">
      {showLogo && (
        <LogoJuripass variant="full" size={logoSize} format="png" />
      )}
      {title && (
        <h1 className="text-2xl font-bold text-foreground">
          {title}
        </h1>
      )}
      {subtitle && (
        <p className="text-muted-foreground text-sm">
          {subtitle}
        </p>
      )}
    </div>
  );
}
