import { BRAND } from '@/lib/constants';

export function useBrandAssets() {
  const logoPath = (
    variant: 'full' | 'icon' | 'horizontal',
    color?: 'white'
  ): string => {
    if (variant === 'horizontal' && color === 'white') {
      return BRAND.assets.logoHorizontalWhite;
    }
    if (variant === 'full') return BRAND.assets.logoFull;
    if (variant === 'icon') return BRAND.assets.logoIcon;
    return BRAND.assets.logoHorizontal;
  };

  const favicon = (size: 16 | 32 = 32): string => {
    return `/favicon-${size}x${size}.png`;
  };

  return {
    logoPath,
    favicon,
    brand: BRAND
  };
}
