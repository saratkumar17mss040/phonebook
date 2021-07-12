require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const app = express();
const initializeDBConnection = require('./db/mongodb.connect');
const Person = require('./models/person.model');

const errorHandler = (error, request, response, next) => {
	console.error(error.message);

	if (error.name === 'CastError') {
		return response.status(400).send({ error: 'malformatted id' });
	} else if (error.name === 'ValidationError') {
		return response.status(400).send({ error: error.message });
	} else if (error.name === 'MongoError' && error.code === 11000) {
		return response.status(422).send({
			error:
				'This phone number already exist in the Database. No duplicate numbers allowed !',
		});
	}
	next(error);
};

const unknownEndpoint = (request, response) => {
	response.status(404).send({
		error: 'unknown endpoint',
	});
};

const PORT = process.env.PORT || 3002;

initializeDBConnection();

// Middlewares

app.use(cors());
app.use(express.static('build'));
app.use(express.json());

// No need in production
morgan.token('postData', (request, response) => {
	return JSON.stringify(request.body);
});

// No need in production
app.use(
	morgan(
		':method :url :status :res[content-length] - :response-time ms :postData'
	)
);

app.get('/', (request, response) => {
	response.send('<h1>Basic 📞 phonebook app</h1>');
});

app.get('/api/persons', (request, response) => {
	Person.find().then((persons) => {
		response.json(persons);
	});
});

app.post('/api/persons', (request, response, next) => {
	const name = request.body.name;
	const number = request.body.number;

	const person = new Person({
		name: name,
		number: number,
	});

	person
		.save()
		.then((savedPerson) => {
			response.json(savedPerson);
		})
		.catch((error) => next(error));
});

app.put('/api/persons/:id', (request, response, next) => {
	const id = request.params.id;
	const body = request.body;

	const person = {
		name: body.name,
		number: body.number,
	};

	Person.findByIdAndUpdate(id, person, {
		runValidators: true,
		new: true,
		context: 'query',
	})
		.then((updatedPerson) => {
			if (updatedPerson) {
				return response.json(updatedPerson);
			}
			response.status(404).end();
		})
		.catch((error) => {
			next(error);
		});
});

app.get('/info', async (request, response, next) => {
	const date = new Date();
	let numberOfPeople;
	try {
		numberOfPeople = await Person.countDocuments();
	} catch (error) {
		next(error);
	}

	response.send(
		`<p>Phonebook application has info for ${numberOfPeople} people</p> <p>${date}</p>`
	);
});

app.get('/api/persons/:id', (request, response, next) => {
	const id = request.params.id;

	Person.findById(id)
		.then((person) => {
			if (person) {
				return response.json(person);
			}
			response.status(404).end();
		})
		.catch((error) => next(error));
});

app.delete('/api/persons/:id', (request, response, next) => {
	const id = request.params.id;

	Person.findByIdAndRemove(id)
		.then((result) => {
			console.log(result);
			if (result) {
				return response.status(204).end();
			}
			response.status(404).end();
		})
		.catch((error) => next(error));
});

/* Do not move !
unknown endoint handler
*/
app.use(unknownEndpoint);

/* Do not move !
error handler
*/
app.use(errorHandler);

app.listen(PORT, () => {
	console.log(`Server is up and ⚡ running on port ${PORT}`);
});
