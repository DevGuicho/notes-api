const express = require('express');
const router = express.Router();
const Note = require('../models/Note');

router.get('/', async (req, res) => {
  const notes = await Note.find({});
  res.json(notes);
});

router.get('/:id', (req, res, next) => {
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

router.post('/', async (req, res, next) => {
  const note = req.body;
  if (!note.content) return res.status(400).json({ error: 'Invalid format' });
  try {
    const newNote = new Note({
      content: note.content,
      date: new Date(),
      important: note.important || false
    });
    const noteSaved = await newNote.save();
    res.status(201).json(noteSaved);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', (req, res, next) => {
  const { id } = req.params;
  const note = req.body;

  Note.findOneAndUpdate(id, note, { new: true })
    .then((resultado) => {
      res.status(200).json({
        message: 'Nota actualizada',
        data: resultado
      });
    })
    .catch((err) => next(err));
});

router.delete('/:id', (req, res, next) => {
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
