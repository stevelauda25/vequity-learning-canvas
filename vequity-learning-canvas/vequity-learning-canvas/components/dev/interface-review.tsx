'use client';

import { lazy, Suspense } from 'react';
import type { InterfaceKitProps } from 'interface-kit/react';

const Editor =
  process.env.NODE_ENV === 'development'
    ? lazy(() =>
        import('interface-kit/react').then(({ InterfaceKit }) => ({
          default: InterfaceKit,
        })),
      )
    : null;

// Both build entry points remove this development-only import in production.
export function InterfaceReview(props: InterfaceKitProps) {
  if (!Editor) return null;
  return (
    <Suspense fallback={null}>
      <Editor {...props} />
    </Suspense>
  );
}
