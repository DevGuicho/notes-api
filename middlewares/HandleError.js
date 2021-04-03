const ERROR_HANDLER = {
  CastError: (res) => res.status(400).json({ error: 'id used is malformed' }),
  ValidationError: (res, error) =>
    res.status(409).json({ error: error.message }),
  JsonWebTokenError: (res, error) =>
    res.status(401).json({
      error: 'token missing or invalid'
    }),
  TokenExpirerError: (res) => res.status(401).json({ error: 'Token expired' }),
  defaultError: (res) => res.status(500).end()
};

module.exports = (error, req, res, next) => {
  console.error(error);
  const handler = ERROR_HANDLER[error.name] || ERROR_HANDLER.defaultError;
  handler(res, error);
};
