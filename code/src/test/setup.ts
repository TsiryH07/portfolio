import '@testing-library/jest-dom/vitest';

// Add shared test setup (mocks, global configs) here if needed.
import { vi } from 'vitest';
import React from 'react';

vi.mock('next/image', () => ({
  __esModule: true,
  default: (
    props: React.ImgHTMLAttributes<HTMLImageElement> & {
      unoptimized?: boolean;
    },
  ) => React.createElement('img', props),
}));

vi.mock('next-intl/navigation', () => ({
  createNavigation: () => ({
    Link: ({
      href,
      children,
      ...props
    }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) =>
      React.createElement('a', { href, ...props }, children),
    redirect: vi.fn(),
    usePathname: () => '/',
    useRouter: () => ({
      push: vi.fn(),
      replace: vi.fn(),
      prefetch: vi.fn(),
      back: vi.fn(),
      forward: vi.fn(),
      refresh: vi.fn(),
    }),
    getPathname: ({
      href,
    }: {
      href: string | { pathname?: string };
    }) => (typeof href === 'string' ? href : href.pathname ?? '/'),
  }),
}));
