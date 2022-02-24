const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.connect("mongodb://localhost:27017/amazonclone", { useNewUrlParse: true, useUnifiedTopology: true })
    .then(() => console.log("connection successful!!!!!"))
    .catch((err) => console.log(err))


const categorySchema = new Schema({
    categoryId: { type: String, required: true },
    categoryname: { type: String, required: true }
})

const Category = mongoose.model('category', categorySchema, 'category')

module.exports = { Category }