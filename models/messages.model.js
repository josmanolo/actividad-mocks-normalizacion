const mongoose = require('mongoose');

const AuthorSchema = new mongoose.Schema({
    name: {type: String},
    lastName: {type: String},
    age: {type: Number},
    user: {type: String},
    img: {type: String},
})

const MessagesSchema = new mongoose.Schema({
    author: {type: [AuthorSchema]},
    txt: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('Messages', MessagesSchema)
