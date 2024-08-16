// script.js

const scoreForm = document.getElementById('scoreForm');
const leaderboardList = document.getElementById('leaderboard');

// Fetch leaderboard data
axios.get('/leaderboard')
  .then(response => {
    response.data.forEach(entry => {
      const li = document.createElement('li');
      li.textContent = `${entry.username}: ${entry.score}`;
      leaderboardList.appendChild(li);
    });
  })
  .catch(error => console.error('Error fetching leaderboard:', error));

// Handle form submission
scoreForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const username = document.getElementById('username').value;
  const score = document.getElementById('score').value;

  axios.post('/submit-score', { username, score })
    .then(response => {
      alert(response.data);
      // Optionally update leaderboard after submission
    })
    .catch(error => console.error('Error submitting score:', error));
});
