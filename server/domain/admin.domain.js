const { Category } = require('../model/category.model')
const { SubCategory } = require('../model/subCategory.model')
const { Brand } = require('../model/brand.model')

const addCategory = async (req, res, next) => {
    const { categoryId, categoryname } = req.body
    const category = new Category(req.body)
    const cat = await Category.findOne({ categoryId: categoryId })
    if (cat === null) {
        await category.save()
        res.json({
            message: 'category added successfully!!'
        })
    } else {
        res.json({
            message: 'category already added'
        })
    }
    console.log(cat)

}

const addSubcategory = async (req, res, next) => {
    const { categoryId, subcategoryId, subCategoryname } = req.body
    const subcategory = new SubCategory(req.body)
    const sub = await SubCategory.findOne({ subcategoryId: subcategoryId })
    console.log(sub);
    if (sub === null) {
        await subcategory.save()
        res.status(200).json({
            message: 'subcategory added successfully!!'
        })
    } else {
        res.status(401).json({
            message: 'subcategory already added'
        })
    }
}

const addBrand = async (req, res, next) => {
    const { brandName, activeStatus } = req.body
    const newbrand = new Brand(req.body)
    const brandexist = await Brand.findOne({ brandName: brandName })
    console.log(brandexist);
    if (sub === null) {
        await newbrand.save()
        res.status(200).json({ message: 'brand added' })
    } else {
        res.status(401).json({ message: 'brand already exist' })
    }
}

const removeBrand = async (req, res, next) => {
    try {
        const { brandName } = req.params
        const result = await Brand.findOneAndDelete({ brandName: brandName })
        res.status(200).json({ message: 'brand deleted successfully' })
    } catch (error) {
        res.status(401).json({ message: "error in deleting brand" })
    }
}

module.exports = { addCategory, addSubcategory, addBrand, removeBrand }