// The only place in the frontend that calls fetch.
// `||` and not `??`: an empty VITE_API_URL (an unset GitHub variable) must fall back too.
const BASE_URL = import.meta.env.VITE_API_URL || '/api';

// GitHub Pages has no backend, so that build answers from demoApi.js instead.
const DEMO_MODE = import.meta.env.VITE_DEMO_MODE === 'true';

export class ApiError extends Error {
  constructor(message, status, details) {
    super(message);
    this.status = status;
    this.details = details;
  }
}

export async function request(path, { method = 'GET', body } = {}) {
  if (DEMO_MODE) {
    // Loaded only in demo mode, so the normal build does not include it.
    const { handleDemoRequest } = await import('./demoApi');
    return handleDemoRequest(path, { method, body });
  }

  let response;
  try {
    response = await fetch(`${BASE_URL}${path}`, {
      method,
      headers: body ? { 'Content-Type': 'application/json' } : undefined,
      body: body ? JSON.stringify(body) : undefined,
    });
  } catch {
    throw new ApiError('No se pudo conectar con el servidor.', 0);
  }

  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new ApiError(payload.error?.message ?? 'Algo salió mal.', response.status, payload.error?.details);
  }
  return payload.data;
}
