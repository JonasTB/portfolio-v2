const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000/api/v1';

export class ApiError extends Error {
  status: number;

  constructor(status: number, path: string) {
    super(`API ${path} respondeu ${status}`);
    this.name = 'ApiError';
    this.status = status;
  }
}

export async function apiGet<T>(path: string): Promise<T> {
  const response = await fetch(`${API_URL}${path}`);
  if (!response.ok) {
    throw new ApiError(response.status, path);
  }
  return response.json() as Promise<T>;
}

export async function apiPost<T>(path: string, body: unknown): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    throw new ApiError(response.status, path);
  }
  return response.json() as Promise<T>;
}
