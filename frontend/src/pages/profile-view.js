import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Paper, Typography, TextField, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';

const API_URL = 'http://localhost:4000/api/users';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    marginTop: theme.spacing(4),
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  formElement: {
    marginBottom: theme.spacing(2),
  },
}));

const ProfileView = () => {
  const classes = useStyles();
  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [newNameInput, setNewNameInput] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [newName, setnewName] = useState(''); // New state variable for the customer name
  const [customerUsername, setCustomerUsername] = useState(''); // New state variable for the customer name
  const [newEmail, setnewEmail] = useState(''); // New state variable for the customer name
  const [customerLoyaltyPoints, setCustomerLoyaltyPoints] = useState(''); // New state variable for the customer name
  const [newPassword1, setNewPassword] = useState(''); // New state variable for the customer name
  const [newPassword2, setNewPassword2] = useState('');

  useEffect(() => {
    // Fetch user information from local storage or API
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (userInfo) {
      setUser({
        username: userInfo.username,
        email: userInfo.email,
        // Omit password for security reasons
      });
      fetchnewName(userInfo._id); // Fetch the customer name
      fetchCustomerUsername(userInfo._id);
      fetchnewEmail(userInfo._id);
      fetchCustomerLoyaltyPoints(userInfo._id);
    }
  }, []);

  const fetchnewName = async (id) => {
    try {
      const response = await axios.get(`${API_URL}/get-customer/${id}`);
      console.log(response);
      setnewName(response.data.name);
    } catch (error) {
      console.error('Error fetching customer:', error);
    }
  };

  const fetchnewEmail = async (id) => {
    try {
      const response = await axios.get(`${API_URL}/get-customer/${id}`);
      console.log(response);
      setnewEmail(response.data.email);
    } catch (error) {
      console.error('Error fetching customer:', error);
    }
  };

  const fetchCustomerLoyaltyPoints = async (id) => {
    try {
      const response = await axios.get(`${API_URL}/get-customer/${id}`);
      console.log(response);
      setCustomerLoyaltyPoints(response.data.loyaltyPoints);
    } catch (error) {
      console.error('Error fetching customer:', error);
    }
  };

  const fetchCustomerUsername = async (id) => {
    try {
      const response = await axios.get(`${API_URL}/get-customer/${id}`);
      console.log(response);
      setCustomerUsername(response.data.username);
    } catch (error) {
      console.error('Error fetching customer:', error);
    }
  };

  const handleChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const handleUsernameChange = (event) => {
    setNewUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setNewPassword(event.target.value);
  };

  const handleNameChange = (event) => {
    setnewName(event.target.value);
  };

  //submit for change of username
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Save the updated user information to local storage or API
    console.log('Updated user information:', user);

    // Assuming you have the user's ID stored in localStorage as well
    var user = JSON.parse(localStorage.getItem('userInfo')); //gets user from localStorage

    try {
      const response = await axios.post(
        `${API_URL}/change-username/${user._id}`,
        {
          newUsername,
        },
        { withCredentials: true }
      );

      console.log('DATA IS' + response.data);

      // Update user information in local storage
      var user = JSON.parse(localStorage.getItem('userInfo')); //gets user from localStorage
      user.username = response.data;
      localStorage.setItem('userInfo', JSON.stringify(user));
      setNewUsername('');
      alert('Username updated. Relog back into the system to see the changes');
    } catch (error) {
      console.error('Error changing username:', error);
    }
  };

  //submit for change of name
  const handleSubmit2 = async (event) => {
    event.preventDefault();

    // Save the updated user information to local storage or API
    console.log('Updated user information:', user);

    // Assuming you have the user's ID stored in localStorage as well
    var user = JSON.parse(localStorage.getItem('userInfo')); //gets user from localStorage

    try {
      const response = await axios.post(
        `${API_URL}/change-name/${user._id}`,
        {
          newName: newNameInput,
        },
        { withCredentials: true }
      );

      console.log(response.data);

      // Update user information in local storage
      const updatedUserInfo = {
        ...JSON.parse(localStorage.getItem('userInfo')),
        username: user.username,
      };
      setNewNameInput('');
      alert('Name updated. Relog back into the system to see the changes');
    } catch (error) {
      console.error('Error changing name:', error);
    }
  };

  //submit for change of password
  const handleSubmit3 = async (event) => {
    event.preventDefault();

    // Save the updated user information to local storage or API
    console.log('Updated user information:', user);

    // Assuming you have the user's ID stored in localStorage as well
    var user = JSON.parse(localStorage.getItem('userInfo')); //gets user from localStorage

    try {
      const response = await axios.post(
        `${API_URL}/change-password/${user._id}`,
        {
          newPassword1,
          newPassword2, // Use the new password 2 state value
        },
        { withCredentials: true }
      );

      console.log(response.data);
      var booly = true;
      if (response.data === 'Passwords do not match') {
        alert('Passwords do not match');
        booly = false;
      }

      // Update user information in local storage
      const updatedUserInfo = {
        ...JSON.parse(localStorage.getItem('userInfo')),
        username: user.username,
      };
      setNewPassword('');
      setNewPassword2(''); // Reset both password fields

      if (response.data === 'Password updated') {
        alert('Password updated');
      } else {
        if (booly) {
          alert('Invalid Password');
        }
      }
    } catch (error) {
      console.error('Error changing name:', error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper className={classes.paper}>
        <Typography variant="h4" align="center" gutterBottom>
          {newName}'s Profile {/* Display the customer name */}
        </Typography>
        <div style={{ marginBottom: '10px' }}>
          <Typography align="left" gutterBottom>
            <strong>Name: </strong> {newName}
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit2}>
            <TextField
              className={classes.formElement}
              label="New Name"
              name="name"
              value={newNameInput}
              onChange={(e) => setNewNameInput(e.target.value)}
              variant="outlined"
              size="small"
              style={{ marginRight: '10px' }}
            />

            <Button
              className={classes.formElement}
              variant="contained"
              color="primary"
              type="submit"
              sx={{
                backgroundColor: '#7865f5',
                '&:hover': {
                  backgroundColor: '#4E2A84',
                },
              }}
            >
              Change Name
            </Button>
          </form>
        </div>
        <div style={{ marginBottom: '10px' }}>
          <Typography align="left" gutterBottom>
            <strong>Username: </strong> {customerUsername}
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <TextField
              className={classes.formElement}
              label="New Username"
              name="newUsername"
              value={newUsername} // Use newUsername state value
              onChange={handleUsernameChange} // Update the newUsername state
              variant="outlined"
              size="small"
              style={{ marginRight: '10px' }} // add margin to the right side of the textfield
            />
            <Button
              className={classes.formElement}
              variant="contained"
              color="primary"
              type="submit"
              sx={{
                backgroundColor: '#7865f5',
                '&:hover': {
                  backgroundColor: '#4E2A84',
                },
              }}
            >
              Change Username
            </Button>
          </form>
        </div>
        <div style={{ marginBottom: '10px' }}>
          <Typography align="left" gutterBottom>
            <strong>Password </strong>
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit3}>
            <TextField
              className={classes.formElement}
              label="New Password"
              name="newPassword1"
              value={newPassword1} // Use newUsername state value
              onChange={handlePasswordChange} // Update the newUsername state
              variant="outlined"
              type="password"
              size="small"
              style={{ marginRight: '10px' }} // add margin to the right side of the textfield
            />
            <TextField
              className={classes.formElement}
              label="Confirm Password"
              name="newPassword2"
              value={newPassword2}
              onChange={(e) => setNewPassword2(e.target.value)}
              variant="outlined"
              type="password"
              size="small"
              style={{ marginRight: '10px' }}
            />

            <Button
              className={classes.formElement}
              variant="contained"
              color="primary"
              type="submit"
              sx={{
                backgroundColor: '#7865f5',
                '&:hover': {
                  backgroundColor: '#4E2A84',
                },
              }}
            >
              Change Password
            </Button>
          </form>
        </div>
        <Typography align="left" gutterBottom>
          <strong>Loyalty Points: </strong> {customerLoyaltyPoints}
        </Typography>
      </Paper>
    </Container>
  );
};

export default ProfileView;
