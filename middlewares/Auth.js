const jwt = require('jsonwebtoken');
const { config } = require('../config');

module.exports = (req, res, next) => {
  let token = null;

  const authorization = req.get('authorization');
  if (authorization && authorization.toLocaleLowerCase().startsWith('bearer')) {
    token = authorization.substring(7);
  }

  if (!token) {
    return res.status(401).json({
      error: 'No token'
    });
  }
  const decodedToken = jwt.verify(token, config.secret);

  if (!decodedToken.id) {
    return res.status(401).json({
      error: 'Token invalid'
    });
  }
  const { id: userId } = decodedToken;
  req.userId = userId;
  next();
};
