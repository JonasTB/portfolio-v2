import { describe, expect, it, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { renderWithProviders, screen, waitFor } from '../../test/test-utils';
import { ContactForm } from './ContactForm';
import { apiPost, ApiError } from '../../lib/api';

vi.mock('../../lib/api', async () => {
  const actual = await vi.importActual<typeof import('../../lib/api')>('../../lib/api');
  return { ...actual, apiPost: vi.fn() };
});

const apiPostMock = vi.mocked(apiPost);

describe('ContactForm', () => {
  it('shows validation errors and never calls the API when required fields are empty', async () => {
    const user = userEvent.setup();
    renderWithProviders(<ContactForm />);

    await user.click(screen.getByRole('button', { name: /enviar mensagem/i }));

    expect(await screen.findAllByText(/campo obrigatório/i)).not.toHaveLength(0);
    expect(apiPostMock).not.toHaveBeenCalled();
  });

  it('submits the payload and shows a success message', async () => {
    apiPostMock.mockResolvedValueOnce({ status: 'sent' });
    const user = userEvent.setup();
    renderWithProviders(<ContactForm />);

    await user.type(screen.getByLabelText(/nome/i), 'Visitante');
    await user.type(screen.getByLabelText(/^email$/i), 'visitante@example.com');
    await user.type(screen.getByLabelText(/assunto/i), 'Assunto de teste');
    await user.type(screen.getByLabelText(/mensagem/i), 'Mensagem de teste com conteúdo real.');
    await user.click(screen.getByRole('button', { name: /enviar mensagem/i }));

    await waitFor(() => {
      expect(apiPostMock).toHaveBeenCalledWith(
        '/contact',
        expect.objectContaining({
          name: 'Visitante',
          email: 'visitante@example.com',
          subject: 'Assunto de teste',
        }),
      );
    });
    expect(await screen.findByText(/mensagem enviada/i)).toBeInTheDocument();
  });

  it('shows the "unavailable" message when the API responds 503', async () => {
    apiPostMock.mockRejectedValueOnce(new ApiError(503, '/contact'));
    const user = userEvent.setup();
    renderWithProviders(<ContactForm />);

    await user.type(screen.getByLabelText(/nome/i), 'Visitante');
    await user.type(screen.getByLabelText(/^email$/i), 'visitante@example.com');
    await user.type(screen.getByLabelText(/assunto/i), 'Assunto');
    await user.type(screen.getByLabelText(/mensagem/i), 'Mensagem de teste com conteúdo real.');
    await user.click(screen.getByRole('button', { name: /enviar mensagem/i }));

    expect(await screen.findByText(/temporariamente indisponível/i)).toBeInTheDocument();
  });
});
