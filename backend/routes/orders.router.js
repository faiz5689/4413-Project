import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Order from '../models/orders.model.js';
import Customer from '../models/customers.model.js';
import Inventory from '../models/inventory.model.js';

const ordersRouter = express.Router();

ordersRouter.post(
  '/checkout/:id',
  expressAsyncHandler(async (req, res) => {
    const customer = await Customer.findOne({ _id: req.params.id }); //finds customer with given id param
    var cartCust = customer.cart;
    var pastOrdersCust = customer.pastOrders;
    const product = await Inventory.findOne({ name: req.body.name }); //finds product with given name

    var cartPrice = await customer.getCartPrice(customer);

    const order = new Order({
      orderItems: cartCust,
      totalPrice: cartPrice,
      customer: customer,
    });

    //saves order to database
    await order.save().then();
    //adds current order to list of customer's past orders
    pastOrdersCust.push(order);

    await Customer.updateOne(
      { _id: customer._id },
      { $set: { pastOrders: pastOrdersCust } }
    );

    //after the order is sent, clear the customers cart
    customer.cart.length = 0;
    await Customer.updateOne(
      { _id: customer._id },
      { $set: { cart: customer.cart } }
    );

    res.send('Your Order has been processed');
  })
);

export default ordersRouter;
