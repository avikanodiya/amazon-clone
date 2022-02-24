const jwt = require("jsonwebtoken")
const config = require("../authorization/config.json")
const bcrypt = require('bcryptjs')
// const db = require('../model/products.model')
// const Mobile = db.Mobile;
// const Tv = db.Tv;
const { Product } = require('../model/products.model')
const { Admin } = require('../model/admin.model')
const { Order } = require('../model/order.model')
const { Category } = require('../model/category.model')
const { Brand } = require('../model/brand.model')
const { productValidate } = require('../validation/validation')

const reg = async (req, res, next) => {
    const { username, password, name } = req.body
    const admin = new Admin(req.body)
    if (password) {
        admin.hash = bcrypt.hashSync(password, 10);
    }
    await admin.save()
    res.json({ message: 'admin registered' })
}

const logg = async (req, res, next) => {
    const { username, password } = req.body
    const admin = await Admin.findOne({ username: username })
    console.log(admin);
    if (admin && bcrypt.compareSync(password, admin.hash)) {
        console.log(password);
        const token = jwt.sign({ sub: admin.id }, config.secret, { expiresIn: '3d' })
        res.json({
            ...admin.toJSON(), token
        })
    }
}


const getMobile = async (req, res, next) => {
    const Mobile = await db.Product.find()
    res.send(Mobile)
}

const addProduct = async (req, res, next) => {
    const data = req.body
    const { error } = productValidate.validate(data)
    if (error) {
        console.log(error);
        res.json({
            message: 'not a valid data'
        })
    } else {
        const tv = await new Product(data)
        await tv.save()
        res.json({
            message: 'product added successfuly'
        })
    }
}

const getProduct = async (req, res, next) => {
    const product = await Product.find()
    console.log(product);
    res.send(product)
}

const getByCompany = async (req, res, next) => {
    const comp = req.params.company
    // const product = await Tv.findOne()
    console.log(comp);
    const tv = await Product.find({ company: comp })

    res.send(tv)
    next();
}

// const getMobileByCompany = async (req, res, next) => {
//     const comp = req.params.company
//     const mobile = await Product.find({ company: comp })
//     res.send(mobile)
// }

const addOrder = async (req, res, next) => {
    const data = req.body
    await Order.insertMany(data)
    res.send('data inserted')
}

const getCategoryProduct = async (req, res, next) => {
    const { categoryId } = req.params
    console.log(categoryId);
    const product = await Product.find({ categoryId: categoryId })
    if (product) {
        res.status(201).json(product)
    } else {
        res.json({ message: 'no product found from that category' })
    }

}

const subCategory = async (req, res, next) => {
    const { subcategoryId } = req.params
    const product = await Product.find({ subcategoryId: subcategoryId })
    res.status(201).json(product)
}

const getOrder = async (req, res, next) => {
    const data = await Order.find().populate('order').populate({ path: 'order.product' })
    res.send(data)
}

const singleProduct = async (req, res, next) => {
    const { id } = req.params
    console.log(req.params);
    console.log(id);
    const p = await Product.findOne({ _id: id })
    res.status(201).json(p)
}

const getCat = async (req, res, next) => {
    const category = await Category.find()
    res.status(201).json(category)
}

const getBrand = async (req, res, next) => {
    const brand = await Brand.find()
    console.log(brand);
    res.status(201).json(brand)
}

// const orderCapture = async (req, res, next) => {
//     console.log(req.body);
//     var options = {
//         amount: req.body.amount,
//         currency: 'INR',
//         reciept: 'rcp1'
//     }
//     instance.orders.create(options, (err, order) => {
//         console.log(order);
//         res.send({ orderId: order.id })
//     })
// }

module.exports = { reg, logg, getMobile, getProduct, addOrder, getOrder, getCategoryProduct, subCategory, addProduct, getByCompany, singleProduct, getCat, getBrand }