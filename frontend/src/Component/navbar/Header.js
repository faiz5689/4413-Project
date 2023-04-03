import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signout } from '../../actions/user.actions.js';
import AppBar from '@mui/material/AppBar';
import { IconButton, Toolbar, Typography } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Button from '@mui/material/Button';
import { Icon } from '@iconify/react';
import { useLocation } from 'react-router-dom';

const Header = () => {
  const [value, setValue] = useState();
  const navigate = useNavigate();
  const pathName = useLocation();
  const dispatch = useDispatch();
  var user = localStorage.getItem('username');

  const handleLogout = (e) => {
    if (user) {
      e.preventDefault();
      dispatch(signout(user));
      localStorage.removeItem('username');
      navigate('/');
    } else {
      alert('Something went wrong.');
    }
  };

  const tabsList = [
    <Tab key="products" component={Link} to="/products" label="Products" />,
    <Tab key="contact" component={Link} to="/contact" label="Contact" />,
  ];

  if (user) {
    tabsList.push(
      <Tab key="checkout" component={Link} to="/checkout" label="Checkout" />
    );
  }

  return (
    <React.Fragment>
      <AppBar
        elevation={pathName.pathname === '/' ? 0 : 3}
        sx={{
          background:
            pathName.pathname === '/'
              ? 'transparent'
              : 'linear-gradient(109.6deg, rgb(9, 9, 121) 11.2%, rgb(144, 6, 161) 53.7%, rgb(0, 212, 255) 100.2%)',
          position: pathName.pathname === '/' ? 'none' : 'sticky',
        }}
      >
        <Toolbar>
          <Button component={Link} to="/" onClick={() => setValue(false)}>
            <Icon icon="mdi:glasses" width="50" height="50" color="white" />
          </Button>
          <Tabs
            sx={{ marginLeft: 'auto' }}
            textColor="inherit"
            value={value}
            onChange={(e, value) => setValue(value)}
            TabIndicatorProps={{ style: { background: '#FADA5E' } }}
          >
            {React.Children.toArray(tabsList)}
          </Tabs>
          {user ? (
            <IconButton
              onClick={() => setValue(false)}
              component={Link}
              to="/cart"
              sx={{ color: 'white', marginLeft: '20%' }}
            >
              <ShoppingCartIcon />
            </IconButton>
          ) : (
            <></>
          )}

          {user ? (
            <>
              Welcome, {user}
              <Button
                onClick={handleLogout}
                component={Link}
                variant="contained"
                color="primary"
                sx={{ marginLeft: '5%' }}
              >
                LOGOUT
              </Button>
            </>
          ) : (
            <>
              <Button
                onClick={() => setValue(false)}
                component={Link}
                to="/login"
                variant="contained"
                color="primary"
                sx={{ marginLeft: '30%' }}
              >
                LOGIN
              </Button>
              <Button
                onClick={() => setValue(false)}
                component={Link}
                to="/register"
                variant="contained"
                color="primary"
                sx={{ marginLeft: '10px' }}
              >
                SIGN UP
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default Header;
