'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import getQueryClient from './get-query-client';

export default function ReactQueryClientProvider({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient();

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
