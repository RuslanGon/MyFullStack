import { Session } from '../db/models/session.js';

export const authenticate = async (req, res, next) => {
  try {
    const header = req.get('Authorization');

    if (!header) {
      console.error('[AUTH ERROR] Authorization header missing');
      return res.status(401).json({
        status: 401,
        message: 'Authorization header is not provided',
      });
    }

    const [bearer, token] = header.split(' ');

    if (bearer !== 'Bearer' || !token) {
      console.error('[AUTH ERROR] Invalid Authorization header format');
      return res.status(401).json({
        status: 401,
        message: 'Authorization header must be of Bearer type',
      });
    }

    const session = await Session.findOne({ accessToken: token });

    if (!session) {
      console.error(`[AUTH ERROR] Session not found for token: ${token}`);
      return res.status(401).json({
        status: 401,
        message: 'Session not found',
      });
    }

    if (new Date() > session.accessTokenValidUntil) {
      console.error(`[AUTH ERROR] Access token expired for sessionId: ${session._id}`);
      return res.status(401).json({
        status: 401,
        message: 'Access token expired',
      });
    }

    req.userId = session.userId;
    req.session = session;

    next();
  } catch (err) {
    console.error('[AUTH ERROR] Unexpected error:', err);
    return res.status(500).json({
      status: 500,
      message: 'Internal server error',
    });
  }
};
