const moongose = require('mongoose');

const Note = require('../models/Note');

const { initialNotes, api, server, getAllNotes } = require('./helpers');

beforeEach(async () => {
  await Note.deleteMany({});

  const notesObjects = initialNotes.map((note) => new Note(note));
  const promises = notesObjects.map((note) => note.save());
  await Promise.all(promises);
});

describe('GET all notes', () => {
  test('notes are returned as json', async () => {
    await api
      .get('/api/notes')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('notes have two notes', async () => {
    const response = await api.get('/api/notes');
    expect(response.body).toHaveLength(initialNotes.length);
  });

  test('the first note is about midudev', async () => {
    const response = await api.get('/api/notes');
    const contents = response.body.map((note) => note.content);
    expect(contents).toContain('Aprendiendo Fullstack JS con midudev');
  });
});
test('a invalid note cannot be added', async () => {
  const newNote = {
    important: true
  };
  await api
    .post('/api/notes')
    .send(newNote)
    .expect(400)
    .expect('Content-Type', /application\/json/);
  const response = await api.get('/api/notes');
  expect(response.body).toHaveLength(initialNotes.length);
});

test('a vali note can be added', async () => {
  const newNote = {
    content: 'Proximamente async await',
    important: true
  };
  await api
    .post('/api/notes')
    .send(newNote)
    .expect(201)
    .expect('Content-Type', /application\/json/);
  const response = await api.get('/api/notes');
  const contents = response.body.map((note) => note.content);
  expect(response.body).toHaveLength(initialNotes.length + 1);
  expect(contents).toContain(newNote.content);
});

test('a note can be delete', async () => {
  const { response } = await getAllNotes();
  const { body: notes } = response;
  const noteToDelete = notes[0];
  await api.delete(`/api/notes/${noteToDelete.id}`).expect(204);
  const { response: secondResponse } = await getAllNotes();

  expect(secondResponse.body).toHaveLength(initialNotes.length - 1);
});

test('a note cannot be delete', async () => {
  await api.delete('/api/notes/12345').expect(400);
  const { response } = await getAllNotes();

  expect(response.body).toHaveLength(initialNotes.length);
});

afterAll(() => {
  moongose.connection.close();
  server.close();
});
