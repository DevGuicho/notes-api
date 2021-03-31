const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cors());

let notes = [
  {
    id: 1,
    content: 'Repasar los retos de JS de midudev',
    important: true
  },
  {
    id: 2,
    content: 'Repasar los retos de JS de midudev',
    important: true
  },
  {
    id: 3,
    content: 'Repasar los retos de JS de midudev',
    important: true
  }
];

app.get('/', (req, res) => {
  res.json({
    hola: 'mundo desde index'
  });
});

app.get('/api/notes', (req, res) => {
  res.json(notes);
});

app.get('/api/notes/:id', (req, res) => {
  const { id } = req.params;
  const note = notes.find((note) => note.id === parseInt(id));
  res.json(note);
});

app.post('/api/notes', (req, res) => {
  const note = req.body;

  const ids = notes.map((note) => parseInt(note.id));
  const id = Math.max(...ids) + 1;
  const newNote = {
    id,
    content: note.content,
    important: note.important,
    date: new Date().toISOString()
  };
  notes.push(newNote);

  res.status(201).json(newNote);
});

app.delete('/api/notes/:id', (req, res) => {
  const { id } = req.params;
  notes = notes.filter((note) => note.id !== parseInt(id));
  res.status(204).end();
});

app.listen(3000, () => console.log(`Server running on port ${port}`));
