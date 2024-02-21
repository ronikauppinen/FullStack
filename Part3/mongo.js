const mongoose = require('mongoose');

if (process.argv.length < 5) {
  console.log('Usage: node mongo.js <password> <name> <phone>');
  process.exit(1);
}

const password = process.argv[2];
const name = process.argv[3];
const phone = process.argv[4];

const url = `mongodb+srv://ronikauppinen01:${password}@cluster0.jxaqvpl.mongodb.net/?retryWrites=true&w=majority`;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

const connection = mongoose.connection;

connection.once('open', () => {
  console.log('Connected to MongoDB Atlas');

  const personSchema = new mongoose.Schema({
    name: String,
    phone: String,
  });

  const Person = mongoose.model('Person', personSchema);

  const person = new Person({
    name: name,
    phone: phone,
  });

  person.save()
    .then(() => {
      console.log(`Added ${name} number ${phone} to phonebook`);
      connection.close();
    })
    .catch(err => console.error('Error adding person:', err));
});

connection.on('error', (err) => {
  console.error('Error connecting to MongoDB Atlas:', err);
});

connection.on('disconnected', () => {
  console.log('Disconnected from MongoDB Atlas');
});
