const UserService = require('./services/user.service');

function registerUser(req, res) {
  const { username, email, password } = req.body;
  const userData = { username, email, password };

  UserService.registerUser(userData, (error, message) => {
    if (error) {
      res.status(500).send({ error });
    } else {
      res.status(200).send({ message });
    }
  });
}

function loginUser(req, res) {
  const { email, password } = req.body;
  const userData = { email, password };

  UserService.loginUser(userData, (error, data) => {
    if (error) {
      res.status(401).send({ error });
    } else {
      res.status(200).send(data);
    }
  });
}

module.exports = {
    registerUser,
    loginUser
};