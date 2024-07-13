import axios from 'axios';

const signupApi = 'http://localhost:3001/api/v1/user/signup';

const users = [
  {
    firstName: 'Tony',
    lastName: 'Stark',
    email: 'tony@stark.com',
    password: 'password123'
  },
  {
    firstName: 'Steve',
    lastName: 'Rogers',
    email: 'steve@rogers.com',
    password: 'password456'
  }
];

const signupUsers = async () => {
  for (const user of users) {
    try {
      const response = await axios.post(signupApi, user);
      console.log(response.data);
    } catch (error) {
      console.error('Error signing up user:', error.response ? error.response.data : error.message);
    }
  }
};

signupUsers();