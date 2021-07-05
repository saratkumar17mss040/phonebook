const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const app = express();

let phonebook = [
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

const PORT = process.env.PORT || 3002;

// Middlewares

app.use(cors());
app.use(express.json());

morgan.token('postData', (request, response) => {
	return JSON.stringify(request.body);
});

app.use(
	morgan(
		':method :url :status :res[content-length] - :response-time ms :postData'
	)
);

app.get('/', (request, response) => {
	response.send('<h1>Basic 📞 phonebook app</h1>');
});

app.get('/api/persons', (request, response) => {
	response.json(phonebook);
});

app.post('/api/persons', (request, response) => {
	const name = request.body.name;
	const number = request.body.number;

	if (!name || !number) {
		return response.status(400).json({
			error: 'Content missing',
		});
	}

	// Both ids are inclusive
	const maxId = 5000;
	const minId = 5;
	const randomId = Math.floor(Math.random() * (maxId - minId + 1)) + minId;
	const personId = phonebook.find((person) => person.id === randomId);
	const personName = phonebook.find(
		(person) => person.name.toLowerCase() === name.toLowerCase()
	);

	if (personId) {
		return response.status(409).json({
			error: 'id must be unique',
		});
	} else if (personName) {
		return response.status(409).json({
			error: 'name must be unique',
		});
	} else {
		const newPerson = {
			id: randomId,
			name: name,
			number: number,
		};
		phonebook = phonebook.concat(newPerson);
		response.json(newPerson);
	}
});

app.get('/info', (request, response) => {
	const date = new Date();
	const numberOfPeople = phonebook.length;
	response.send(
		`<p>Phonebook has info for ${numberOfPeople} people</p> <p>${date}</p>`
	);
});

app.get('/api/persons/:id', (request, response) => {
	const id = +request.params.id;
	const person = phonebook.find((person) => person.id === id);
	if (person) {
		response.json(person);
	} else {
		response.status(404).end();
	}
});

app.delete('/api/persons/:id', (request, response) => {
	const id = +request.params.id;
	const person = phonebook.find((person) => person.id === id);
	if (person) {
		phonebook = phonebook.filter((note) => note.id !== id);
		response.status(204).end();
	} else {
		response.status(404).end();
	}
});

app.listen(PORT, () => {
	console.log(`Server is up and ⚡ running on port ${PORT}`);
});
