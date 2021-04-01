require('./mongo');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const app = express();
const port = process.env.PORT || 3000;
const Note = require('./models/Note');
const NotFound = require('./middlewares/NotFound');
const HandleError = require('./middlewares/HandleError');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cors());

app.get('/', (req, res) => {
  res.json({
    hola: 'mundo desde index'
  });
});

app.get('/api/notes', (req, res) => {
  Note.find({}).then((notes) => {
    res.json(notes);
  });
});

app.get('/api/notes/:id', (req, res, next) => {
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

app.post('/api/notes', (req, res, next) => {
  const note = req.body;

  const newNote = new Note({
    content: note.content,
    date: new Date(),
    important: note.important || false
  });
  newNote
    .save()
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((error) => next(error));
});

app.put('/api/notes/:id', (req, res, next) => {
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

app.delete('/api/notes/:id', (req, res, next) => {
  const { id } = req.params;
  Note.findByIdAndDelete(id)
    .then((result) => {
      if (result) {
        res.status(200).json({
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

app.use(HandleError);

app.use(NotFound);

app.listen(port, () => console.log(`Server running on port ${port}`));
