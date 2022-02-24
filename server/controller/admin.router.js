var express = require('express');
const AdminBro = require('admin-bro')
const AdminBroMongoose = require('@admin-bro/mongoose')
const AdminBroExpress = require('@admin-bro/express')
const { Product } = require('../model/products.model')
const { Admin } = require('../model/admin.model')
const { Order } = require('../model/order.model')
const { User } = require('../model/users.model')
const { Brand } = require('../model/brand.model')
var app = express();
const bcrypt = require('bcryptjs')
const mongoose = require('mongoose');//Routes
const AdminBroExpressjs = require('admin-bro-expressjs')
const { before: beforehook } = require('../actions/order.hook')

//Admin Bro
const canModifyUsers = ({ currentAdmin }) => currentAdmin && currentAdmin.role === 'admin'

const canEditEmp = ({ currentAdmin, record }) => {
    return currentAdmin && (
        currentAdmin.role === 'admin'

    )
}
AdminBro.registerAdapter(AdminBroMongoose)
const AdminBroOptions = {
    resources:
        [{
            resource: Brand
        }, {
            resource: Product,
            options: {
                new: {
                    before: async (request, context) => {
                        const modifiedRequest = await beforehook(response, request, context)
                        return beforehook(modifiedRequest, request, context)
                    },
                    after: async (request, context) => {
                        const modifiedRequest = await beforehook(response, request, context)
                        return beforehook(modifiedRequest, request, context)
                    }
                }
            }
            // options: {
            //     actions: {
            //         new: {
            //             before: async (request, context) => {
            //                 const modifiedRequest = await beforehook(response, request, context)
            //                 return beforehook(modifiedRequest, request, context)
            //             },
            //             after: async (request, context) => {
            //                 const modifiedRequest = await beforehook(response, request, context)
            //                 return beforehook(modifiedRequest, request, context)
            //             }
            //         },
            //         edit: {
            //             before: async (request, context) => {
            //                 const modifiedRequest = await beforehook(response, request, context)
            //                 return beforehook(modifiedRequest, request, context)
            //             },
            //             after: async (request, context) => {
            //                 const modifiedRequest = await beforehook(response, request, context)
            //                 return beforehook(modifiedRequest, request, context)
            //             }
            //         },
            //         show: {
            //             before: async (request, context) => {
            //                 const modifiedRequest = await beforehook(response, request, context)
            //                 return beforehook(modifiedRequest, request, context)
            //             },
            //             after: async (request, context) => {
            //                 const modifiedRequest = await beforehook(response, request, context)
            //                 return beforehook(modifiedRequest, request, context)
            //             }
            //         }
            //     }
            // },

        },
        {
            resource: User,
            options: {
                properties: {
                    email: {
                        isVisible: true
                    },
                    hash: {
                        isVisible: false
                    },
                    firstname: {
                        isVisible: true
                    },
                    lastname: {
                        isVisible: true
                    },
                    carts: {
                        isVisible: false
                    }
                }
            },
        },
        // {
        //     resource: Order,
        //     options: {
        //         properties: {
        //             customer: {
        //                 actions: {
        //                     list: AdminBro.bundle('../CustomContent/CustomContent.tsx'),
        //                     edit: AdminBro.bundle('../CustomContent/CustomContent.tsx'),
        //                     show: AdminBro.bundle('../CustomContent/CustomContent.tsx'),
        //                 }
        //             },
        //             order: {
        //                 isVisible: false
        //             },
        //             amount: {
        //                 isVisible: true
        //             },
        //             address: {
        //                 isVisible: true
        //             },
        //             contact: {
        //                 isVisible: true
        //             },
        //             date: {
        //                 isVisible: true
        //             }
        //         },
        //         // properties: {
        //         //     map: {
        //         //         components: {
        //         //             order: AdminBro.bundle('../CustomContent'),
        //         //         },
        //         //         isVisible: {
        //         //             show: true, view: false, edit: false, filter: false,
        //         //         }
        //         //     },
        //         // },
        //         actions: {
        //             new: {
        //                 before: async (request, context) => {
        //                     const modifiedRequest = await beforehook(response, request, context)
        //                     return beforehook(modifiedRequest, request, context)
        //                 },
        //             },
        //         },
        //         // actions: {
        //         //     new: {
        //         //         before: async (request) => {
        //         //             request.payload.record = {
        //         //                 customer: await Order.find({ customer: id }).populate('customer')
        //         //             }
        //         //             return request
        //         //         }
        //         //     }
        //         // }
        //     },
        // },
        {
            resource: Admin,
            options: {
                properties: {
                    hash: { isVisible: false },
                    password: {
                        type: 'string',
                        isVisible: {
                            list: false, edit: true, filter: false, show: false,
                        },
                    },
                },
                actions: {
                    new: {
                        before: async (request) => {
                            if (request.payload.record.password) {
                                request.payload.record = {
                                    ...request.payload.record,
                                    hash: await bcrypt.hash(request.payload.record.password, 10),
                                    password: undefined,
                                }
                            }
                            return request
                        },
                    },
                    edit: { isAccessible: true },
                    delete: { isAccessible: true },
                    new: { isAccessible: true },
                }
            }
        }],
}
const adminBro = new AdminBro(AdminBroOptions)
const router = AdminBroExpressjs.buildAuthenticatedRouter(adminBro, {
    authenticate: async (email, password) => {
        const user = await Admin.findOne({ email })
        if (user) {
            if (bcrypt.compareSync(password, user.hash)) {
                return user
            }
        }
        return false
    },
    cookiePassword: 'session Key',
})

module.exports = router;
