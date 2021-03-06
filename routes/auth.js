const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { config } = require('../config');
const auth = require('../middlewares/Auth');

router.get('/', auth, async (req, res, next) => {
  const { userId: _id } = req;
  try {
    const user = await User.findById(_id);
    res.json({
      message: 'User logged',
      data: user
    });
  } catch (error) {
    next(error);
  }
});

router.post('/sign-in', async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  const passwordCorrrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash);

  if (!passwordCorrrect) {
    return res.status(401).json({
      error: 'Invalid user or password'
    });
  }
  const token = jwt.sign(
    {
      id: user._id,
      username: user.username
    },
    config.secret,
    { expiresIn: 60 * 60 * 24 * 7 }
  );
  res.json({
    message: 'login successful',
    data: {
      user,
      token
    }
  });
});
router.post('/sign-up', async (req, res) => {});
module.exports = router;
