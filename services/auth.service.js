const jwt = require('jsonwebtoken');

function verifyToken(token, callback) {
  jwt.verify(token, 'secret_key', (err, decoded) => {
    if (err) {
      console.log(err); // Cetak kesalahan ke konsol
      callback('Token tidak valid', null);
    } else {
      callback(null, decoded);
    }
  });
}

module.exports = {
  verifyToken
};
