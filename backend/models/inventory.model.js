import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const reviewSchema = new Schema(
  {
    name: { type: String, required: true },
    comment: { type: String, required: true },
    rating: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const inventorySchema = new Schema(
    {
        name: { type: String, required: true, unique: true },
        description: { type: String, required: true },
        price: { type: Number, required: true },
        image: { type: String, required: true },
        colour: { type: String, required: true},
        category: { type: String, required: true },
        brand: { type: String, required: true },
        numberInStock: { type: Number, required: true },
        rating: { type: Number, required: true },
        reviewNumber: { type: Number, required: true },
        reviews: [reviewSchema]
      },
      {
        timestamps: true,
      }
);

const Inventory = mongoose.model('Inventory', inventorySchema);

export default Inventory;