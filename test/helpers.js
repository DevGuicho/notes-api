const supertest = require('supertest');
const { app, server } = require('../index');
const api = supertest(app);
const User = require('../models/User');

const initialNotes = [
  {
    content: 'Aprendiendo Fullstack JS con midudev',
    important: true,
    date: new Date()
  },
  {
    content: 'sigueme en https://midu.tube',
    important: true,
    date: new Date()
  }
];

const getAllNotes = async () => {
  const response = await api.get('/api/notes');
  const contents = response.body.map((note) => note.content);
  return { response, contents };
};
const getUsers = async () => {
  const usersDB = await User.find({});
  return usersDB.map((user) => user.toJSON());
};

module.exports = {
  initialNotes,
  api,
  server,
  getAllNotes,
  getUsers
};
