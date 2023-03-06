import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const orderSchema = new Schema(
    {
      orderItems: [
        {
          name: { type: String, required: true },
          quantity: { type: Number, required: true },
          image: { type: String, required: true },
          price: { type: Number, required: true },
          loyaltyPoints {type: Number, required: true},
          product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true,
          },
        },
      ],
      totalPrice: { type: Number, required: true },
      customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
    },
    {
      timestamps: true,
    }
  );
  const Order = mongoose.model('Order', orderSchema);
  export default Order;