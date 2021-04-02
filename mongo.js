const mongoose = require('mongoose');
const { config } = require('./config');

const dbName =
  process.env.NODE_ENV === 'test' ? config.dbNameTest : config.dbName;
const connectionString = `mongodb+srv://${config.dbUser}:${config.dbPassword}@${config.dbHost}/${dbName}?retryWrites=true&w=majority`;

mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
  .then(() => {
    console.log('Database connected');
  })
  .catch((error) => console.log(error));
