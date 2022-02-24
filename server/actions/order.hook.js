const AdminBro = require('admin-bro')
const { Order } = require('../model/order.model')

const before = async (response, request, context) => {
    if (request.method === 'post') {
        const { customer, ...otherParams } = request.payload
        console.log(id);
        context.carts = carts;
        return {
            ...request,
            payload: {
                ...otherParams,
                carts
            }
        }
    }
    return request;
}

module.exports = { before };