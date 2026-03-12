const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  medicines: [
    {
      medicineId: { type: mongoose.Schema.Types.ObjectId, ref: 'Medicine' },
      name: String,
      price: Number,
      quantity: { type: Number, default: 1 }
    }
  ],
  address: { type: String, required: true },
  phone: { type: String, required: true },
  totalAmount: { type: Number, default: 0 },
  status: { type: String, default: 'Order Placed' }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);