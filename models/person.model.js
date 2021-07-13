const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


const personSchema = new mongoose.Schema({
    id: Number,
    name: {
        type: String,
        minLength: [3, 'User name must be atleast 3 characters long.'],
        required: true,
        unique: true,
    },
    number: {
        type: String,
        minLength: [8, 'Phone number must have at least 8 digits.'],
        required: true,
    },
});

personSchema.plugin(uniqueValidator);

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    },
});

module.exports = mongoose.model('Person', personSchema);
