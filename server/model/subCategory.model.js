const mongoose = require('mongoose');
const { Category } = require('./category.model');
const Schema = mongoose.Schema;

mongoose.connect("mongodb://localhost:27017/amazonclone", { useNewUrlParse: true, useUnifiedTopology: true })
    .then(() => console.log("connection successful!!!"))
    .catch((err) => console.log(err))

const subCategorySchema = new Schema({
    categoryId: { type: String, required: true },
    subcategoryId: { type: String, required: true },
    subcategoryname: { type: String, required: true }
})

const SubCategory = mongoose.model('subCategory', subCategorySchema, 'subCategory')

module.exports = { SubCategory }