import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const customerSchema = new Schema(
    {
      name: { type: String, required: true },
      username: {type: String, required: true, unique: true},
      password: { type: String, required: true },
      isAdmin: { type: Boolean, default: false, required: true },
      pastOrders: [
        {
          name: { type: String, required: true },
          quantity: { type: Number, required: true },
          image: { type: String, required: true },
          price: { type: Number, required: true },
          product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true,
          },
        },
      ],
    },
    {
      timestamps: true,
    }
  );
  const User = mongoose.model('Customer', customerSchema);
  export default User;