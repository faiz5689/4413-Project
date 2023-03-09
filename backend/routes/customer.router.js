import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import Customer from '../models/customers.model.js';
import { isAdmin, isAuth } from '../utils/tokenCheck.js';
import { tokenGenAndSign } from '../utils/jwtAuth.js';

const customerRouter = express.Router();

customerRouter.post(
  '/login',
  expressAsyncHandler(async (req, res) => {
    const customer = await Customer.findOne({ email: req.body.username });
    if (customer) 
    {
      if (bcrypt.compareSync(req.body.password, customer.password)) 
      {
        res.send({
          _id: customer._id,
          name: customer.name,
          username: customer.username,
          isAdmin: customer.isAdmin,
          token: tokenGenAndSign(customer),
        });
        return;
      }
    }
    res.status(401).send({ message: "Invalid email or password" });
  })
);

customerRouter.post('/register',
  expressAsyncHandler(async (req, res) => {
    const customer = new Customer({
      username: req.body.username,
      password: bcrypt.hashSync(req.body.password, 8),
    });
    const createdCustomer = await customer.save();
    res.send({
      _id: createdCustomer._id,
      name: createdCustomer.name,
      username: createdCustomer.username,
      isAdmin: createdCustomer.isAdmin,
      token: tokenGenAndSign(createdCustomer),
    });
  })
);

export default customerRouter;