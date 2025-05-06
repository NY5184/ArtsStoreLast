//bs"d
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [
        {
            art: { type: mongoose.Schema.Types.ObjectId, ref: 'Art', required: true },
            quantity: { type: Number, required: true, min: 1 }
        }
    ],
    totalPrice: { type: Number, required: true },
    isPayed: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);