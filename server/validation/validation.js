const Joi = require('@hapi/joi')

const validateUser = Joi.object({
    email: Joi.string().max(50).email().required(),
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    password: Joi.string().min(6).required(),
    carts: Joi.array()
})

const authValidate = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().min(8).required()
})



const productValidate = Joi.object({
    categoryId: Joi.string().required(),
    subcategoryId: Joi.string().required(),
    title: Joi.string().required(),
    company: Joi.string().required(),
    pattern: Joi.string(),
    imageUrl: Joi.string().required(),
    price: Joi.number().required(),
    specification: Joi.object().required()
    // specification: Joi.object().keys({
    //     storage: Joi.string(),
    //     screenSize: Joi.string(),
    //     resolution: Joi.string(),
    //     displayTech: Joi.string(),
    //     modelyear: Joi.number(),
    // })
})

// const categoryValidate = Joi.object({
//     _id:
// })

module.exports = { validateUser, authValidate, productValidate }