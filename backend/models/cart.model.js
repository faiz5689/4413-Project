import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const cartSchema = new Schema(
  {
    //username specifies which user's cart we are referring to
    username: { type: String, required: true, unique: true },

    //total price of the cart
    totalPrice: { type: Number, required: true },

    //list of products (each with name, qty, image, and price)
    products: [
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
const Cart = mongoose.model('Cart', cartSchema);
export default Cart;
