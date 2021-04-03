require('./mongo');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const app = express();
const port = process.env.PORT || 3000;

const NotFound = require('./middlewares/NotFound');
const HandleError = require('./middlewares/HandleError');
const notesApi = require('./routes/notes');
const usersApi = require('./routes/users');
const authApi = require('./routes/auth');

// MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cors());

// ROUTES
app.use('/api/notes/', notesApi);
app.use('/api/users/', usersApi);
app.use('/api/auth/', authApi);

// ERROR HANDLERS
app.use(HandleError);
app.use(NotFound);

const server = app.listen(port, () =>
  console.log(`Server running on port ${port}`)
);

module.exports = { app, server };
