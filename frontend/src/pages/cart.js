import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

//Customer URL: Fixed file
const API_URL = 'http://localhost:4000/api/users';
const API_URL_INVENTORY = 'http://localhost:4000/api/inventory';

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
    marginLeft: 'auto',
    textTransform: 'none',
    borderRadius: '0.25rem',
    fontSize: '1rem',
    padding: '0.5rem 1rem',
    '&.MuiButton-containedPrimary': {
      backgroundColor: '7865f5',
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
  quantitycell: {
    // width: '10%',
  },
  pricecell: {
    // marginLeft: '40px',
  },
}));

const Cart = () => {
  const navigate = useNavigate();
  const classes = useStyles();
  var user = JSON.parse(localStorage.getItem('userInfo')); //gets user from localStorage
  const [loyaltyPoints, setLoyaltyPoints] = useState(0);

  var dataVar;
  const [fetchedItems, setFetchedItems] = useState([]);
  // if user is signed in
  // Fetch the cart data when the component mounts
  let quantityVar = 1;
  useEffect(() => {
    if (user && Object.keys(user).length > 0) {
      const fetchCartData = async () => {
        try {
          const { data } = await axios.get(`${API_URL}/cart/${user._id}`, {
            withCredentials: true,
          }); //display user's cart
          const fetchedItems = [];
          for (let i = 0; i < data.length; i++) {
            console.log('DATA[i] IS ' + data[i]);
            if (data[i] != null) {
              const {
                data: item,
              } = await axios.get(
                `${API_URL_INVENTORY}/get-product/${data[i]}`,
                { withCredentials: true }
              );

              const obj = {
                id: item._id,
                name: item.name,
                price: item.price,
                quantity: 1,
              };

              const existingItemIndex = fetchedItems.findIndex(
                (item) => item.id === obj.id
              );

              if (existingItemIndex !== -1) {
                fetchedItems[existingItemIndex].quantity += 1;
              } else {
                fetchedItems.push(obj);
              }
            }
          }

          setCartItems(fetchedItems);
        } catch (error) {
          alert('Error');
        }
      };

      fetchCartData();
    }
  }, [user && user._id]); // Change this line

  const [cartItems, setCartItems] = useState([]);

  const handleQuantityChange = async (itemId, newQuantity) => {
    if (newQuantity < 1) return; //remove everything from cart

    const currentItem = cartItems.find((item) => item.id === itemId); //find current item
    if (!currentItem) return;

    //Up arrow
    if (newQuantity > currentItem.quantity) {
      // Add item to cart
      try {
        await axios.post(
          `${API_URL}/add-to-cart-copy/${user._id}`,
          {
            name: currentItem.name,
          },
          { withCredentials: true }
        );
      } catch (error) {
        console.error('Error adding item to cart:', error);
        return;
      }
    }

    //Down arrow
    else if (newQuantity < currentItem.quantity) {
      // Remove item from cart
      try {
        await axios.post(
          `${API_URL}/remove-one/${user._id}`,
          {
            name: currentItem.name,
          },
          { withCredentials: true }
        );
      } catch (error) {
        console.error('Error removing item from cart:', error);
        return;
      }
    }

    // Update cart items in local state
    const updatedCartItems = cartItems.map((item) => {
      if (item.id === itemId) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });

    setCartItems(updatedCartItems);
  };

  const handleRemoveItem = async (itemId) => {
    const itemToRemove = cartItems.find((item) => item.id === itemId);
    if (!itemToRemove) return;

    try {
      await axios.post(
        `${API_URL}/remove-from-cart/${user._id}`,
        {
          name: itemToRemove.name,
        },
        { withCredentials: true }
      );
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }

    const updatedCartItems = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedCartItems);
  };

  const handleLoyaltyChange = (subtotal, points) => {
    if (points >= 0 && points <= user.loyaltyPoints && subtotal >= 1) {
      setLoyaltyPoints(points);
      localStorage.setItem('loyPtsUsed', points);
    }
  };

  const handleCheckout = (total, loyaltyPoints) => {
    // this block needed for frontend loyalty points updating
    // end block
    // navigate({
    //   pathname: '/checkout',
    //   state: {
    //     totalPrice: totalPrice,
    //     totalLoyaltyPoints: totalLoyaltyPoints,
    //   },
    // });
    // Add other checkout handling below - pass the total and loyalty points to the checkout page and navigate there.
  };

  const subtotal = cartItems.reduce(
    (total, item) =>
      total +
      item.price * item.quantity -
      (loyaltyPoints * 0.1) / cartItems.length,
    0
  );

  return (
    <div>
      <Typography
        variant="h4"
        className={classes.title}
        style={{ marginTop: '20px' }}
      >
        Your Cart
      </Typography>
      {cartItems.length === 0 ? (
        <Typography
          variant="body1"
          textAlign="center"
          style={{ marginTop: '20px' }}
        >
          Your cart is currently empty.
        </Typography>
      ) : (
        <TableContainer
          component={Paper}
          style={{ boxShadow: 'none', marginBottom: '5%' }}
        >
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
                  <TableCell align="right" className={classes.pricecell}>
                    ${item.price.toFixed(2)}
                  </TableCell>
                  <TableCell align="right" className={classes.quantityCell}>
                    <Box display="flex" alignItems="center">
                      <IconButton
                        aria-label="Decrease quantity"
                        onClick={() =>
                          handleQuantityChange(item.id, item.quantity - 1)
                        }
                        disabled={item.quantity === 1}
                      >
                        <RemoveCircleIcon
                          style={{
                            color:
                              item.quantity === 1
                                ? 'rgba(255, 0, 0, 0.5)'
                                : 'red',
                          }}
                        />
                      </IconButton>
                      <Typography
                        variant="body1"
                        component="span"
                        className={classes.quantity}
                      >
                        {item.quantity}
                      </Typography>
                      <IconButton
                        aria-label="Increase quantity"
                        onClick={() =>
                          handleQuantityChange(item.id, item.quantity + 1)
                        }
                      >
                        <AddBoxIcon style={{ color: '#228B22' }} />
                      </IconButton>
                    </Box>
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
                      handleLoyaltyChange(subtotal, parseInt(e.target.value))
                    }
                    inputProps={{
                      style: { textAlign: 'right' },
                    }}
                  />
                </TableCell>
                <TableCell align="right"></TableCell>
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
                  Tax: (13%):
                </TableCell>
                <TableCell align="right">
                  ${(subtotal * 0.13).toFixed(2)}
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan="3" align="right">
                  Total:
                </TableCell>
                <TableCell align="right">
                  ${(subtotal * 1.13).toFixed(2)}
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <Box textAlign="center">
        {cartItems.length === 0 ? (
          <Button
            component={Link}
            to="/products"
            variant="contained"
            color="primary"
            className={classes.button}
            sx={{
              marginTop: '20px',
              backgroundColor: '#7865f5',
              '&:hover': {
                backgroundColor: '#4E2A84',
              },
            }}
          >
            Browse Products
          </Button>
        ) : (
          <Button
            component={Link}
            to="/checkout"
            variant="contained"
            color="primary"
            className={classes.button}
            sx={{
              backgroundColor: '#7865f5',
              '&:hover': {
                backgroundColor: '#4E2A84',
              },
              fontSize: '1.5rem',
            }}
            onClick={() =>
              handleCheckout(
                subtotal * 1.13 + 0.1 * loyaltyPoints,
                loyaltyPoints
              )
            }
          >
            Continue to Checkout
          </Button>
        )}
      </Box>
    </div>
  );
};

export default Cart;
