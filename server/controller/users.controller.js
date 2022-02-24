const express = require('express')
const router = express.Router();
const { forgotPassword, getById, updateCart, addOrder, getOrder, updateData, validUser } = require('../domain/users.domain')

router.post('/forgotpassword', forgotPassword)
router.post('/updatedata/:id', updateCart)
router.post('/addorder', addOrder)
router.get('/getorders/:id', getOrder)
router.post('/updateuser', updateData)
router.get('/validuser/:id', validUser)
module.exports = router; 