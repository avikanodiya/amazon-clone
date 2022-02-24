const joi = require('joi');
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

mongoose.connect("mongodb://localhost:27017/amazonclone", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("connection successful!!!!"))
    .catch((err) => console.log(err));


const schema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    hash: {
        type: String,
        required: true
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
    },
    carts: Array
})

const User = mongoose.model('User', schema, "User")
module.exports = { User }