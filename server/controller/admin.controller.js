const express = require('express')
const router = express.Router()
const { addCategory, addSubcategory, addBrand, removeBrand} = require('../domain/admin.domain')

router.post('/addcategory', addCategory)
router.post('/addsubcategory', addSubcategory)
router.post('/addbrand', addBrand)
router.get('/deletebrand/:brandName', removeBrand)
module.exports = router;