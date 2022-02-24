const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { User } = require('./users.model')

mongoose.connect("mongodb://localhost:27017/amazonclone", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => { console.log('connection successful'); })
    .catch((err) => console.log(err))

const orderSchema = new Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User
    },
    order: { type: Array, required: true },
    amount: { type: Number, requiredt: true },
    address: { type: String, required: true },
    contact: { type: String, required: true },
    date: { type: Date, required: true }
})

const Order = mongoose.model('orders', orderSchema, 'orders')

module.exports = { Order }