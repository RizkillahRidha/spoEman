const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const db = require('../db');

function registerUser(userData, callback) {
  const { username, email, password } = userData;

  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      callback('Terjadi kesalahan saat mengenkripsi password', null);
    } else {
      const user = { username, email, password: hashedPassword };

      db.query('INSERT INTO users SET ?', user, (err, result) => {
        if (err) {
          callback('Gagal mendaftar pengguna', null);
        } else {
          callback(null, 'Pengguna berhasil terdaftar');
        }
      });
    }
  });
}

function loginUser(userData, callback) {
  const { email, password } = userData;

  db.query('SELECT * FROM users WHERE email = ?', email, (err, results) => {
    if (err) {
      callback('Terjadi kesalahan saat mencari pengguna', null);
    } else if (results.length === 0) {
      callback('Email atau password salah', null);
    } else {
      const user = results[0];

      bcrypt.compare(password, user.password, (bcryptErr, bcryptResult) => {
        if (bcryptErr) {
          callback('Terjadi kesalahan saat memeriksa password', null);
        } else if (!bcryptResult) {
          callback('Email atau password salah', null);
        } else {
          const token = jwt.sign({ email: user.email, userId: user.id }, 'secret_key', { expiresIn: '1h' });

          callback(null, { message: 'Login berhasil', token: token });
        }
      });
    }
  });
}

module.exports = {
  registerUser,
  loginUser
};
