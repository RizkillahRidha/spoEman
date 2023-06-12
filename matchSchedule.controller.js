const db = require('./db');

function createMatchSchedule(req, res) {
  const { scheduleId, time, firstTeam, secondTeam } = req.body;

  // Lakukan validasi data jadwal di sini jika diperlukan

  // Lakukan penambahan jadwal pertandingan ke dalam tabel match_schedules
  const query = 'INSERT INTO daily_schedules (schedule_id, time, firstTeam, secondTeam) VALUES (?, ?, ?, ?)';
  const values = [scheduleId, time, firstTeam, secondTeam];

  db.query(query, values, (error, result) => {
    if (error) {
      console.error('Error creating match schedule:', error);
      res.status(500).send({ error: 'Failed to create match schedule' });
    } else {
      res.status(200).send({ message: 'Match schedule created successfully' });
    }
  });
}

function getMatchSchedules(req, res) {
    db.query('SELECT * FROM daily_schedules', (error, results) => {
      if (error) {
        console.error('Error getting match schedules:', error);
        res.status(500).send({ error: 'Failed to get match schedules' });
      } else {
        res.status(200).send(results);
      }
    });
  }

module.exports = {
  createMatchSchedule,
  getMatchSchedules
};
