const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

app.get('/api/users', async (req, res) => {
  const { search } = req.query;
  if (search) {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/users');
      const filteredUsers = response.data.filter(
        (user) => user.email === search || user.username === search
      );
      filteredUsers.length !== 0
        ? res.json({
            success: true,
            total: filteredUsers.length,
            data: filteredUsers.map(({ name, email }) => ({ name, email })),
            error: false,
            message: 'User listing successful',
        })
        : res.send('No user or email found');
    } catch (error) {
      console.error(error);
      res.json({ success: false, error: true, message: 'Something went wrong' });
    }
  } else {
    res.json({ success: false, error: true, message: 'Search query parameter not found' });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
