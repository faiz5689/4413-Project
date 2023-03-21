import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import Customer from '../models/customers.model.js';
import { isAdmin, isAuth } from '../utils/tokenCheck.js';
import { tokenGenAndSign } from '../utils/jwtAuth.js';
import Inventory from '../models/inventory.model.js';

const customerRouter = express.Router();

customerRouter.post(
  '/login',
  expressAsyncHandler(async (req, res) => {
    const customer = await Customer.findOne({ username: req.body.username });
    console.log(customer);
    if (customer) {
      if (bcrypt.compareSync(req.body.password, customer.password)) {
        const newToken = tokenGenAndSign(customer);
        const cookieOptions = {
          expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
          ),
          httpOnly: true,
        };
        // Maybe also add redirect to home here??
        res.cookie('token', newToken, cookieOptions);
        res.send({
          _id: customer._id,
          name: customer.name,
          username: customer.username,
          isAdmin: customer.isAdmin,
          token: newToken,
        });
        return;
      } else {
        return res.status(401).send({
          token: null,
          message: 'Invalid password!',
        });
      }
    } else {
      return res.status(404).send({ message: 'User does not exist' });
    }
    res.status(401).send({ message: 'Invalid email or password' });
  })
);

customerRouter.post(
  '/register',
  expressAsyncHandler(async (req, res) => {
    const doesUserExist = await Customer.findOne({
      username: req.body.username,
    });
    if (!doesUserExist) {
      var pwRegExp = new RegExp(
        /(?=[A-Za-z0-9@#$%^&+!=]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+!=])(?=.{8,}).*$/
      );
      var isPwLegal = pwRegExp.test(req.body.password);

      if (isPwLegal) {
        const customer = new Customer({
          name: req.body.name,
          username: req.body.username,
          password: bcrypt.hashSync(req.body.password, 8),
          loyaltyPoints: 0,
          // // isAdmin: false,
        });

        const createdCustomer = await customer.save().then();
        res.send({
          _id: createdCustomer._id,
          name: createdCustomer.name,
          username: createdCustomer.username,
          isAdmin: createdCustomer.isAdmin,
        });
      } else {
        return res.status(401).send({
          token: null,
          message: 'Invalid password!',
        });
      }
    } else {
      return res.status(404).send({ message: 'User already exists' });
    }
  })
);

customerRouter.get(
  '/logout',
  expressAsyncHandler(async (req, res) => {
    // Redirect here, just like login
    res.clearCookie('token');
    res.status(200).json({
      success: true,
      message: 'Logged out',
    });
  })
);

//post request to add item to cart
customerRouter.post(
  '/add-to-cart/:id',
  expressAsyncHandler(async (req, res) => {
    const customer = await Customer.findOne({ _id: req.params.id }); //finds customer with given id param
    var cartCust = customer.cart;
    const product = await Inventory.findOne({ name: req.body.name }); //finds product with given name

    //add item to customer's cart
    cartCust.push(product);

    //update database
    await Customer.updateOne(
      { _id: customer._id },
      { $set: { cart: cartCust } }
    );

    //send entire customer
    res.send(customer);
  })
);

//post request to add item to cart
customerRouter.post(
  '/remove-from-cart/:id',
  expressAsyncHandler(async (req, res) => {
    const customer = await Customer.findOne({ _id: req.params.id }); //finds customer with given id param
    var cartCust = customer.cart;
    const product = await Inventory.findOne({ name: req.body.name }); //finds product with given name

    //remove item to customer's cart
    cartCust.remove(product);

    //update database
    await Customer.updateOne(
      { _id: customer._id },
      { $set: { cart: cartCust } }
    );

    //send entire customer
    res.send(customer);
  })
);

export default customerRouter;
