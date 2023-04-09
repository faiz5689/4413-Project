import React from 'react';
import { render } from 'react-dom';
import Card from 'react-credit-cards-2';
import './cardStyles.css';
// const { totalPrice, totalLoyaltyPoints } = location.state || {
//   totalPrice: 0,
//   totalLoyaltyPoints: 0,
// };

import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate,
} from './utils.js';

import 'react-credit-cards-2/es/styles-compiled.css';
import axios from 'axios';

const API_URL = 'http://localhost:4000/api/orders';

export default class Checkout extends React.Component {
  state = {
    number: '',
    name: '',
    expiry: '',
    cvc: '',
    issuer: '',
    focused: '',
    formData: null,
  };

  handleCallback = ({ issuer }, isValid) => {
    if (isValid) {
      this.setState({ issuer });
    }
  };

  handleInputFocus = ({ target }) => {
    this.setState({
      focused: target.name,
    });
  };

  handleInputChange = ({ target }) => {
    if (target.name === 'number') {
      target.value = formatCreditCardNumber(target.value);
    } else if (target.name === 'expiry') {
      target.value = formatExpirationDate(target.value);
    } else if (target.name === 'cvc') {
      target.value = formatCVC(target.value);
    }

    this.setState({ [target.name]: target.value });
  };

  handleSubmit = async (e) => {
    var checkoutCounter = parseInt(localStorage.getItem('checkoutCounter'));
    e.preventDefault();
    if (checkoutCounter % 3 != 0) {
      this.form.reset();
      alert('Order Successfully Completed!');
      window.location.href = '/';
    } else {
      this.form.reset();
      alert('Credit Card Authorization failed');
    }
  };

  render() {
    const { name, number, expiry, cvc, focused, issuer } = this.state;

    return (
      <div key="Payment">
        <div className="App-payment">
          <h1>Enter your billing details</h1>
          <h4>Please input your information below</h4>
          <Card
            number={number}
            name={name}
            expiry={expiry}
            cvc={cvc}
            focused={focused}
            callback={this.handleCallback}
          />
          <form ref={(c) => (this.form = c)} onSubmit={this.handleSubmit}>
            <div className="form-group">
              <small>Name on card:</small>

              <input
                id="checkout-input"
                type="text"
                name="name"
                className="form-control"
                placeholder="Name"
                pattern="[a-z A-Z-]+"
                required
                onChange={this.handleInputChange}
                onFocus={this.handleInputFocus}
              />
            </div>
            <div className="form-group">
              <small>Card Number:</small>

              <input
                id="checkout-input"
                type="tel"
                name="number"
                className="form-control"
                placeholder="Card Number"
                pattern="[\d| ]{16,22}"
                maxLength="19"
                required
                onChange={this.handleInputChange}
                onFocus={this.handleInputFocus}
              />
            </div>

            <div className="form-group">
              <small>Expiration Date:</small>

              <input
                id="checkout-input"
                type="tel"
                name="expiry"
                className="form-control"
                placeholder="Valid Thru"
                pattern="\d\d/\d\d"
                required
                onChange={this.handleInputChange}
                onFocus={this.handleInputFocus}
              />
            </div>
            <div className="form-group">
              <small>CVC:</small>

              <input
                id="checkout-input"
                type="tel"
                name="cvc"
                className="form-control"
                placeholder="CVC"
                pattern="\d{3}"
                required
                onChange={this.handleInputChange}
                onFocus={this.handleInputFocus}
              />
            </div>
            <div className="form-group">
              <small>Billing Address:</small>

              <input
                id="checkout-input"
                type="text"
                name="billing"
                className="form-control"
                placeholder="Billing Address"
                pattern="^[a-zA-Z0-9\s\-\.,]+$"
                required
                onChange={this.handleInputChange}
                onFocus={this.handleInputFocus}
              />
              <small style={{ marginLeft: '10px' }}>Postal Code:</small>

              <input
                id="checkout-input"
                type="text"
                name="postal"
                className="form-control"
                placeholder="Postal Code"
                pattern="^[a-zA-Z0-9\s\-]+$"
                required
                onChange={this.handleInputChange}
                onFocus={this.handleInputFocus}
              />
            </div>
            <input
              id="checkout-input"
              type="hidden"
              name="issuer"
              value={issuer}
            />
            <div className="form-actions">
              <button id="credit-submit" onClick={() => handleCheckoutFunc()}>
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const handleCheckoutFunc = async () => {
  // store used loyaltyPts here, then pass them to backend
  var user = JSON.parse(localStorage.getItem('userInfo')); //gets user from localStorage
  var loyPts = localStorage.getItem('loyPtsUsed');
  var checkoutCounter = parseInt(localStorage.getItem('checkoutCounter'));

  try {
    checkoutCounter = checkoutCounter + 1; // increment the value
    localStorage.setItem('checkoutCounter', checkoutCounter.toString());
    if (checkoutCounter % 3 != 0) {
      const { data } = await axios.post(
        `${API_URL}/checkout/${user._id}`,
        {
          loyaltyPoints: loyPts,
        },
        { withCredentials: true }
      );
      user.loyaltyPoints = data.loyaltyPointsTotal;
      localStorage.setItem('userInfo', JSON.stringify(user));
      localStorage.setItem('loyPtsUsed', 0);
    }
  } catch (error) {
    console.error('Error checking out:', error);
  }
};

// render(<Checkout />, document.getElementById('root'))
// export default Checkout;
