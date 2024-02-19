const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
app.use(express.json());

app.use(cors());

//Custom token
morgan.token('postData', (req, res) => {
  if (req.method === 'POST') {
      return JSON.stringify(req.body);
  } else {
      return '';
  }
});
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :postData'));

//Phonebook entries
let phonebookEntries = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: 4,
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
];

//All people
app.get('/api/persons', (req, res) => {
  res.json(phonebookEntries);
});

//Info
app.get('/info', (req, res) => {
  const numberOfEntries = phonebookEntries.length;

  const infoMessage =
    `
      Phonebook has info of ${numberOfEntries} people<br/>` +
    new Date().toString();

  res.send(infoMessage);
});

//Single person
app.get('/api/persons/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const entry = phonebookEntries.find((entry) => entry.id === id);

  if (entry) {
    res.json(entry);
  } else {
    res.status(404).send('Entry not found');
  }
});

//Delete person
app.delete('/api/persons/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const deletedIndex = phonebookEntries.findIndex((entry) => entry.id === id);

  if (deletedIndex !== -1) {
    phonebookEntries.splice(deletedIndex, 1);
    res.status(204).end();
  } else {
    res.status(404).send('Entry not found');
  }
});

//Add person
app.post('/api/persons', (req, res) => {
  const body = req.body;

  if (!body.name || !body.number) {
    return res.status(400).json({ error: 'Name or number is missing' });
  }

  const nameExists = phonebookEntries.some((entry) => entry.name === body.name);

  if (nameExists) {
    return res.status(400).json({ error: 'Name must be unique' });
  }

  const newEntry = {
    id: Math.floor(Math.random() * 10000) + 1,
    name: body.name,
    number: body.number,
  };

  phonebookEntries.push(newEntry);
  res.json(newEntry);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});