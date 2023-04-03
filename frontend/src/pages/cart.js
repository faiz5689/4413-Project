import React, { useState } from 'react';

import User from '../models/customer.model.js';

// Assuming you have a variable called 'username' with the desired username
const customer = await User.findOne({ username: username });
const cart = customer.cart;

const Cart = () => {
  const [cartItems, setCartItems] = useState(cart);

  // Function to add an item to the cart
  const addToCart = (item) => {
    setCartItems([...cartItems, item]);
  };

  // Function to remove an item from the cart
  const removeFromCart = (item) => {
    const updatedCart = cartItems.filter((cartItem) => cartItem.id !== item.id);
    setCartItems(updatedCart);
  };

  // Function to calculate the total cost of all items in the cart
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };

  return (
    <div>
      <h2>Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div key={item.id}>
              <h3>{item.name}</h3>
              <p>{item.price}</p>
              <button onClick={() => removeFromCart(item)}>
                Remove from Cart
              </button>
            </div>
          ))}
          <h3>Total: {calculateTotal()}</h3>
        </div>
      )}
    </div>
  );
};

export default Cart;
