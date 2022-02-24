const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')

mongoose.connect("mongodb://localhost:27017/amazonclone", { useNewUrlParse: true, useUnifiedTopology: true })
    .then(() => console.log("connection successful!!!!"))
    .catch((err) => console.log(err));

const brandSchema = new Schema({
    brandName: {
        type: String, required: true, trim: true
    },
    activeStatus: {
        type: Boolean, default: true
    }
})

const Brand = mongoose.model('brand', brandSchema, 'brand')

module.exports = { Brand }