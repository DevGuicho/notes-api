const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { api, getUsers } = require('./helpers');
const moongose = require('mongoose');
const { server } = require('../index');

describe('creating a new user', () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash('pswd', 10);
    const user = new User({ username: 'miduroot', passwordHash });

    await user.save();
  });

  test('works as expected creating a fresh username', async () => {
    const usersAtStart = await getUsers();

    const newUser = {
      username: 'midudev',
      name: 'Miguel',
      password: 'tw1tch'
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await getUsers();

    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);
    expect(usernames).toContain(newUser.username);
  });

  test('creation fails with proper statuscode and message if username is already taken', async () => {
    const usersAtStart = await getUsers();

    const newUser = {
      username: 'miduroot',
      name: 'Miguel',
      password: 'tw1tch'
    };
    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(409)
      .expect('Content-Type', /application\/json/);

    expect(result.body.error).toContain('`username` to be unique');
    const usersAtEnd = await getUsers();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });

  afterAll(() => {
    moongose.connection.close();
    server.close();
  });
});
