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
    var loyaltyPointsPaymentAmount = req.body.loyaltyPoints;
    var finalCartPrice = 0;

    var fullCartPrice = await customer.getCartPrice(customer);

    var currLoyaltyPoints = customer.loyaltyPoints;

    // check if the customer has enough loyalty points for their request
    if (currLoyaltyPoints < loyaltyPointsPaymentAmount)
    {
      res.status(403).send({ message: "You don't have enough loyalty points for this request!"});
      return;
    }
    else
    {
      finalCartPrice = fullCartPrice - (loyaltyPointsPaymentAmount / 10);
      if (finalCartPrice < 0)
      {
        finalCartPrice = 0;
      }
    }

    var discount = fullCartPrice - finalCartPrice;
    var updatedLoyaltyPoints = currLoyaltyPoints + (fullCartPrice) - loyaltyPointsPaymentAmount;

    const order = new Order({
      orderItems: cartCust,
      totalPrice: finalCartPrice,
      customer: customer,
    });

    //saves order to database
    await order.save().then();
    //adds current order to list of customer's past orders
    pastOrdersCust.push(order);

    await Customer.updateOne(
      { _id: customer._id },
      { $set: { pastOrders: pastOrdersCust, loyaltyPoints: updatedLoyaltyPoints } }
    );

    //after the order is sent, clear the customers cart
    customer.cart.length = 0;
    await Customer.updateOne(
      { _id: customer._id },
      { $set: { cart: customer.cart } }
    );

    res.send({ 
      message: 'Your Order has been processed',
      fullPrice: fullCartPrice,
      finalPrice: finalCartPrice,
      discount: discount,
      loyaltyPointsUsed: loyaltyPointsPaymentAmount,
    });
  })
);

export default ordersRouter;
