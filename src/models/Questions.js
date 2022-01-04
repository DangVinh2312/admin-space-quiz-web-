const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Question = new Schema({
    text: String,
    answers: Object,
    correctAnswer: Number,
}, { timestamps: true, })

module.exports = mongoose.model('Question', Question);