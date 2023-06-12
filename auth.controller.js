const AuthService = require('./services/auth.service');

function verifyToken(req, res, next) {
  const token = req.headers.authorization.split(' ')[1];
  if (!token) {
    res.status(401).send({ error: 'Token tidak tersedia' });
  } else {
    AuthService.verifyToken(token, (error, decoded) => {
      if (error) {
        res.status(401).send({ error });
      } else {
        req.userId = decoded.userId;
        next();
      }
    });
  }
}

module.exports = {
  verifyToken
};
