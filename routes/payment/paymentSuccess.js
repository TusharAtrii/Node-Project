const bookings = require("../../models/Billing/bookingSchema");
const payments = require("../../models/Billing/paymentSchema");
const PaymentReceiptNodemailer = require("./PaymentReceiptNodemailer");

/**
 * 
 * @method  POST
 * @api  /paymentSuccess
 * @description   -after payment successfully captured this saves data in db
 */


module.exports = async (req, res) => {

    if (req?.body?.transactionId) {
        const { transactionId, amount_captured, bookingId } = req.body;
        try {
            const result = new payments({
                transactionId,
                amount: amount_captured,
                bookingId,
                userId: req.user._id,
                type: 'card'
            })
            await result.save();
            await bookings.findByIdAndUpdate({ _id: bookingId }, {
                $set: {
                    paymentStatus: 'paid'
                }
            })
            const bookingDetails = await bookings.findOne({ _id: bookingId });
            const email = bookingDetails?.email
            const name = bookingDetails?.fullName
            // await PaymentReceiptNodemailer(email,name,transactionId,amount_captured,'card','paid');
            res.send('success')
        } catch (error) {
            res.send(error)
        }
    } else {
        const { amount_captured, bookingId, type } = req.body;
        try {
            const result = new payments({
                amount: amount_captured,
                bookingId,
                userId: req.user._id,
                type: type
            })
            await result.save();
            res.send('success')
        } catch (error) {
            res.send(error)
        }
    }



}