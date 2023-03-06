import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const productSchema = new Schema(
    {
        name: { type: String, required: true, unique: true },
        description: { type: String, required: true },
        price: { type: Number, required: true },
        image: { type: String, required: true },
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

const Product = mongoose.model('Product', productSchema);

export default Product;