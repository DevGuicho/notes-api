const supertest = require('supertest');
const { app, server } = require('../index');
const api = supertest(app);

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
module.exports = {
  initialNotes,
  api,
  server,
  getAllNotes
};
