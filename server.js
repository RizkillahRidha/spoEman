const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const UserController = require('./user.controller');
const AuthController = require('./auth.controller');
const MatchScheduleController = require('./matchSchedule.controller');
const ScheduleController = require('./schedule.controller');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/api/register', UserController.registerUser);
app.post('/api/login', UserController.loginUser);
app.get('/api/protected', AuthController.verifyToken, (req, res) => {
  res.status(200).send({ message: 'Endpoint terproteksi berhasil diakses' });
});
app.get('/api/schedules', AuthController.verifyToken, ScheduleController.getSchedules);
app.post('/api/schedules', AuthController.verifyToken, ScheduleController.createSchedule);
app.get('/api/match-schedules', AuthController.verifyToken, MatchScheduleController.getMatchSchedules);
app.post('/api/match-schedules', AuthController.verifyToken, MatchScheduleController.createMatchSchedule);
app.get('/api/daily_schedule/:id', AuthController.verifyToken, ScheduleController.getDailySchedule);

app.listen(3000, () => {
  console.log('Server berjalan pada port 3000');
});
