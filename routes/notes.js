const express = require('express');
const router = express.Router();
const Note = require('../models/Note');
const User = require('../models/User');
const auth = require('../middlewares/Auth');
const passport = require('passport');
require('../utils/auth/strategies/jwt');

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const notes = await Note.find({}).populate('user', {
      name: 1,
      username: 1
    });
    res.json(notes);
  }
);

router.get('/:id', auth, (req, res, next) => {
  const { id } = req.params;

  Note.findById(id)
    .then((note) => {
      if (note) {
        res.json({
          message: 'Note retrieve',
          data: note
        });
      } else {
        res
          .status(404)
          .json({ message: 'No hay ninguna nota con ese id', data: {} });
      }
    })
    .catch((error) => {
      next(error);
    });
});

router.post('/', auth, async (req, res, next) => {
  const note = req.body;
  const { userId } = req;
  const { content, important } = note;
  const user = await User.findById(userId);

  if (!content) return res.status(400).json({ error: 'Invalid format' });
  const newNote = new Note({
    content: content,
    date: new Date(),
    important: important || false,
    user: user._id
  });
  try {
    const noteSaved = await newNote.save();
    user.notes = user.notes.concat(newNote._id);
    await user.save();
    res.status(201).json(noteSaved);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', auth, (req, res, next) => {
  const { id } = req.params;
  const note = req.body;

  Note.findOneAndUpdate({ _id: id }, note, { new: true })
    .then((resultado) => {
      res.status(200).json({
        message: 'Nota actualizada',
        data: resultado
      });
    })
    .catch((err) => next(err));
});

router.delete('/:id', auth, (req, res, next) => {
  const { id } = req.params;
  Note.findByIdAndDelete(id)
    .then((result) => {
      if (result) {
        res.status(204).json({
          message: 'Nota eliminada',
          data: result
        });
      } else {
        res.status(404).json({
          message: 'No hay una nota con ese Id',
          data: {}
        });
      }
    })
    .catch((err) => next(err));
});

module.exports = router;
