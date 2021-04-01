const mongoose = require('mongoose');
const { config } = require('./config');

const connectionString = `mongodb+srv://${config.dbUser}:${config.dbPassword}@${config.dbHost}/${config.dbName}?retryWrites=true&w=majority`;

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

/* const noteSchema = new Schema({
  content: String,
  date: Date,
  important: Boolean
});

const Note = model('Note', noteSchema); */
/*
const note = new Note({
  content: 'Mongo db es increible',
  date: new Date(),
  important: true
});

 note
  .save()
  .then((result) => {
    console.log(result);
    mongoose.connection.close();
  })
  .catch((error) => console.log(error)); */

/* Note.find({}).then((result) => {
  console.log(result);
  mongoose.connection.close();
});
 */
