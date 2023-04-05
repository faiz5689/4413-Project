import React from 'react';
import { useState } from 'react';
import { makeStyles } from '@mui/styles';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  Typography,
} from '@mui/material';
import Axios from 'axios';

const API_URL = 'http://localhost:4000/api/customer';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    //   marginTop: theme.spacing(4),
  },
  title: {
    textAlign: 'center',
    fontSize: '2.5rem',
    //   marginBottom: theme.spacing(2),
  },
  table: {
    borderCollapse: 'separate',
    borderSpacing: '0 1rem',
    width: '100%',
    maxWidth: '800px',
    margin: '0 auto',
    backgroundColor: 'white',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    borderRadius: '0.5rem',
  },
  tableHead: {
    backgroundColor: '#f2f2f2',
    borderRadius: '0.5rem 0.5rem 0 0',
  },
  tableRow: {
    '&:last-child': {
      borderRadius: '0 0 0.5rem 0.5rem',
    },
  },
  inputBase: {
    border: '1px solid #ccc',
    borderRadius: '0.25rem',
    padding: '0.25rem 0.5rem',
  },
  button: {
    textTransform: 'none',
    borderRadius: '0.25rem',
    fontSize: '1rem',
    padding: '0.5rem 1rem',
    '&.MuiButton-containedPrimary': {
      backgroundColor: '#5f5fff',
      color: 'white',
    },
    '&.MuiButton-outlinedSecondary': {
      color: '#ff5f5f',
      borderColor: '#ff5f5f',
    },
  },
  typography: {
    fontSize: '1.25rem',
  },
  body1: {
    textAlign: 'center',
    //   marginTop: theme.spacing(4),
    fontSize: '1.5rem',
  },
}));
const Cart = () => {
  const classes = useStyles();
  var user = JSON.parse(localStorage.getItem("userInfo"));
  const [loyaltyPoints, setLoyaltyPoints] = useState(0);
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Product 1', price: 10.99, quantity: 2 },
    { id: 2, name: 'Product 2', price: 19.99, quantity: 1 },
    { id: 3, name: 'Product 3', price: 4.99, quantity: 4 },
  ]);

  const handleQuantityChange = (itemId, newQuantity) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item.id === itemId) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    setCartItems(updatedCartItems);
  };

  const handleRemoveItem = (itemId) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedCartItems);
  };

  const handleLoyaltyChange = (points) => {
    
    if (points >= 0 && points <= user.loyaltyPoints)
    {
      setLoyaltyPoints(points);
    }
  }

  const handleCheckout = (total, loyaltyPoints) => {
      // this block needed for frontend loyalty points updating
      var userInfo = JSON.parse(localStorage.getItem("userInfo"));
      userInfo.loyaltyPoints = userInfo.loyaltyPoints - loyaltyPoints;
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
      // end block
      // Add other checkout handling below - pass the total and loyalty points to the checkout page and navigate there.
  }

  const subtotal = cartItems.reduce(
    (total, item) => total + (item.price * item.quantity) - (loyaltyPoints * 0.1 / cartItems.length),
    0
  );

  return (
    <div>
      <Typography variant="h4" className={classes.title}>
        Your Cart
      </Typography>
      {cartItems.length === 0 ? (
        <Typography variant="body1">Your cart is empty</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="Cart Table">
            <TableHead>
              <TableRow>
                <TableCell>Product Name</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Quantity</TableCell>
                <TableCell align="right">Total</TableCell>
                <TableCell align="right">Remove</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cartItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell align="right">${item.price.toFixed(2)}</TableCell>
                  <TableCell align="right">
                    <TextField
                      className={classes.input}
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) =>
                        handleQuantityChange(item.id, parseInt(e.target.value))
                      }
                      inputProps={{
                        style: { textAlign: 'right' },
                      }}
                    />
                  </TableCell>
                  <TableCell align="right">
                    ${(item.price * item.quantity).toFixed(2)}
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      variant="outlined"
                      color="secondary"
                      size="small"
                      onClick={() => handleRemoveItem(item.id)}
                    >
                      Remove
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell colSpan="3" align="right">
                  Use Loyalty Points:
                </TableCell>
                <TableCell align="right">
                  <TextField
                      className={classes.input}
                      type="number"
                      min="0"
                      value={loyaltyPoints}
                      onChange={(e) =>
                        handleLoyaltyChange(parseInt(e.target.value))
                      }
                      inputProps={{
                        style: { textAlign: 'right' },
                      }}
                    />
                </TableCell>
                <TableCell align="right">

                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan="3" align="right">
                  Subtotal:
                </TableCell>
                <TableCell align="right">${subtotal.toFixed(2)}</TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan="3" align="right">
                  Tax: (10%):
                </TableCell>
                <TableCell align="right">
                  ${(subtotal * 0.1).toFixed(2)}
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan="3" align="right">
                  Total:
                </TableCell>
                <TableCell align="right">
                  ${(subtotal * 1.1).toFixed(2)}
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <Button variant="contained" color="primary" className={classes.button}  onClick={() => handleCheckout((subtotal * 1.1), loyaltyPoints)}>
        Checkout
      </Button>
    </div>
  );
};

export default Cart;
