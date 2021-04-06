const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const auth = require('../middlewares/Auth');

router.get('/', auth, async (req, res) => {
  const { userId: _id } = req;
  const query = { _id };
  const users = await User.find(query).populate('notes', {
    content: 1,
    date: 1
  });

  res.json({
    message: 'Users listed',
    data: users
  });
});
router.get('/:id', (req, res) => {});
router.post('/', async (req, res, next) => {
  const user = req.body;
  const { username, name, password } = user;

  const userFounded = await User.find({ username });
  if (userFounded.length !== 0) {
    return res.status(409).json({ error: '`username` to be unique' });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const newUser = new User({
    username,
    name,
    passwordHash
  });

  try {
    const userSaved = await newUser.save();
    res.status(201).json({
      message: 'User created',
      data: userSaved
    });
  } catch (error) {
    next(error);
  }
});
router.put('/:id', (req, res) => {});
router.delete('/:id', (req, res) => {});

module.exports = router;
