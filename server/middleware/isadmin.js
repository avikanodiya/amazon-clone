const { Admin } = require('../model/admin.model')
const isAdmin = async (req, res, next) => {
    const { email } = req.body
    let isadmin = await Admin.find({ email })
    console.log(`admin:${typeof isadmin}`);
    if (isadmin) {
        req.admin = 'admin'
        next()
    } else {
        req.user = 'user'
        next()
    }
}

module.exports = { isAdmin }