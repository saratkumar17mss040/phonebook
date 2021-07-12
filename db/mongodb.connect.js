require('dotenv').config();
const mongoose = require('mongoose');
const mongodbUrl = process.env.MONGODB_URI;

const initializeDBConnection = () => {
	console.log('connecting to', mongodbUrl);
	mongoose
		.connect(mongodbUrl, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: false,
			useCreateIndex: true,
		})
		.then((result) => {
			console.log('connected to MongoDB');
		})
		.catch((error) => {
			console.log('error connecting to MongoDB:', error.message);
		});
};

module.exports = initializeDBConnection;
