import { unauthorized } from '../utils/httpError.js';

// Placeholder: there are no user accounts yet.
// Reads a Bearer token if present so routes can opt in later.
export function optionalAuth(req, res, next) {
  const header = req.headers.authorization ?? '';
  req.token = header.startsWith('Bearer ') ? header.slice(7) : null;
  req.user = null;
  next();
}

export function requireAuth(req, res, next) {
  if (!req.user) return next(unauthorized());
  next();
}
