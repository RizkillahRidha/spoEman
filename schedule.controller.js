const db = require('./db');

function getSchedules(req, res) {
  db.query('SELECT * FROM schedules', (error, results) => {
    if (error) {
      console.error('Error getting schedules:', error);
      res.status(500).send({ error: 'Failed to get schedules' });
    } else {
      res.status(200).send(results);
    }
  });
}

function getDailySchedule(req, res) {
  const scheduleId = req.params.id;

  // Fetch the daily schedule data from the database based on the schedule ID
  const query = 'SELECT * FROM daily_schedules WHERE schedule_id = ?';
  const values = [scheduleId];

  db.query(query, values, (error, result) => {
    if (error) {
      console.error('Error fetching daily schedule:', error);
      res.status(500).send({ error: 'Failed to fetch daily schedule' });
    } else {
      const dailySchedule = result;

      res.status(200).send({ dailySchedule });
    }
  });
}

function createSchedule(req, res) {
  const { date, time, location, participants, category } = req.body;

  // Lakukan validasi data jadwal di sini jika diperlukan

  // Lakukan penambahan jadwal kompetisi ke dalam tabel schedules
  const query = 'INSERT INTO schedules (date, time, location, participants, category) VALUES (?, ?, ?, ?, ?)';
  const values = [date, time, location, participants, category];

  db.query(query, values, (error, result) => {
    if (error) {
      console.error('Error creating schedule:', error);
      res.status(500).send({ error: 'Failed to create schedule' });
    } else {
      res.status(200).send({ message: 'Schedule created successfully' });
    }
  });
}

module.exports = {
  getSchedules,
  getDailySchedule,
  createSchedule,
};
