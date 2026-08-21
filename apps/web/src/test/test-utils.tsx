import type { ReactElement, ReactNode } from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '../app/providers/ThemeProvider';
import { LocaleProvider } from '../app/providers/LocaleProvider';

function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: { retry: false, staleTime: Infinity },
      mutations: { retry: false },
    },
  });
}

interface RenderOptions {
  route?: string;
}

export function renderWithProviders(ui: ReactElement, { route = '/' }: RenderOptions = {}) {
  const queryClient = createTestQueryClient();

  function Wrapper({ children }: { children: ReactNode }) {
    return (
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <LocaleProvider>
            <MemoryRouter initialEntries={[route]}>{children}</MemoryRouter>
          </LocaleProvider>
        </ThemeProvider>
      </QueryClientProvider>
    );
  }

  return render(ui, { wrapper: Wrapper });
}

export * from '@testing-library/react';
