const express = require("express")
const router = express.Router();
const { capturePayment, orderConfirm } = require('../domain/razorpay.domain')

router.get('/order/:amountTotal', orderConfirm)
router.post('/capture/:paymentId', capturePayment)

module.exports = router;