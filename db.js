const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'spoeman'
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Terhubung dengan database MySQL');
});

module.exports = db;
