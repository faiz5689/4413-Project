import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Order from '../models/orders.model.js';
import Customer from '../models/customers.model.js';
import Inventory from '../models/inventory.model.js';

const adminRouter = express.Router();

adminRouter.get(
  '/run-sales-report/:id',
  expressAsyncHandler(async (req, res) => {
    const user = await Customer.findOne({ _id: req.params.id }); //finds customer with given id param

    //Check if user is admin
    if (user.isAdmin) {
      // const findResult = await Order.find({
      //     createdAt: {
      //         //new date object for the current date subtracting a month, in milliseconds
      //         $gte: new Date(new Date().getTime() - 1000 * 3600 * 24 * 30),
      //         //current date at time of query
      //         $lt: new Date(),
      //       },
      // })
      const aggResult = await Order.aggregate([
        // First Stage
        {
          $match: {
            createdAt: {
              $gte: new Date(new Date().getTime() - 1000 * 3600 * 24 * 30),
              $lt: new Date(),
            },
          },
        },
        //group BY date AS xyz
        // Second Stage
        {
          $group: {
            _id: { month: { $month: '$createdAt' } },
            totalPrice: { $sum: { $sum: ['$totalPrice'] } },
            count: { $sum: 1 },
          },
        },
        //Third Stage
        {
          $sort: {
            totalPrice: -1,
          },
        },
      ]);

      console.log(aggResult);
      // console.log(findResult);
      //number of orders in past month
      // console.log("You sold this many items: " + findResult.length);
      // console.log(findResult[0]._id
      res.send(aggResult);
    } else {
      res.send('You have to be an admin to run a report on sales');
    }
  })
);

export default adminRouter;
