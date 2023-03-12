import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const customerSchema = new Schema(
    {
      name: { type: String, required: true },
      username: {type: String, required: true, unique: true},
      password: { type: String, required: true, match: [
        /^(?=.*\d)(?=.*[@#\-_$%^&+=§!\?])(?=.*[a-z])(?=.*[A-Z])[0-9A-Za-z@#\-_$%^&+=§!\?]+$/,
        'Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number and a special character']
       },
      isAdmin: { type: Boolean, default: false, required: true },
      loyaltyPoints: {type: Number, required: true},
      pastOrders: [
        {
          name: { type: String, required: true },
          quantity: { type: Number, required: true },
          image: { type: String, required: true },
          price: { type: Number, required: true },
          product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Inventory',
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