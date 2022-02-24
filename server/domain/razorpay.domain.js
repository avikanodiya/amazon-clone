const Razorpay = require('razorpay')
const request = require('request')
const keys = require('../keys')

const razorInstance = new Razorpay({
    key_id: keys.razorIdkey,
    key_secret: keys.razorIdSecret
})

const orderConfirm = async (req, res, next) => {
    const { amountTotal } = req.params
    console.log(`order : ${amountTotal}`);
    try {
        const options = {
            amount: amountTotal * 100,
            currency: "INR",
            payment_capture: 0
        }
        razorInstance.orders.create(options, async (err, order) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    message: "error in order placement"
                })
            }
            return res.status(200).json(order)
        })
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: `Error: ${err}`
        })
    }
}

const capturePayment = async (req, res, next) => {
    try {
        return request({
            method: "POST",
            url: `https://${keys.razorIdkey}:${keys.razorIdSecret}@api.razorpay.com/v1/payments/${req.params.paymentId}/capture`,
            form: {
                amount: req.body.amountTotal * 100,
                currency: "INR"
            },
        },
            async (err, response, body) => {
                console.log(body);
                if (err) {
                    return res.status(500).json({
                        message: `error:${err}`
                    })
                }
                return res.status(200).json(body)
            }
        )
    } catch (err) {
        return res.status(500).json({
            message: `inside catch ${err.message}`
        })
    }
}

module.exports = { orderConfirm, capturePayment }