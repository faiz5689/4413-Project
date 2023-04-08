import * as React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { register } from '../actions/user.actions.js';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {'Copyright © SunSational Shades, '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

function ContactForm({
  handleSubmit,
  name,
  setName,
  email,
  setEmail,
  message,
  setMessage,
}) {
  return (
    <Box sx={{ flexGrow: 1, p: 2 }}>
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <MailOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
        Contact Us
      </Typography>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              autoComplete="name"
              name="name"
              required
              fullWidth
              id="name_id"
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoFocus
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="message"
              label="Message"
              multiline
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{
            mt: 3,
            mb: 2,
            backgroundColor: '#7865f5',
            '&:hover': {
              backgroundColor: '#4E2A84',
            },
          }}
        >
          Send Message
        </Button>
        <Grid container justifyContent="flex-end-left">
          <Grid item>
            <Link href="/" variant="body2">
              Back to Home
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

function ContactInfo() {
  return (
    <Box sx={{ flexGrow: 1, p: 15 }}>
      <Typography variant="h4" className="SunsationalShades" sx={{ mb: 2 }}>
        Contact Information
      </Typography>
      <Typography variant="subtitle1">Phone: 1-800-123-4567</Typography>
      <Typography variant="subtitle1">
        Email: Sunsational@ecommerce.com
      </Typography>
      <Typography variant="subtitle1">Address: Toronto, ON, Canada</Typography>
    </Box>
  );
}

const theme = createTheme();

export default function ContactPage(props) {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    // handling of the form is not done and just an alert is sent.
    dispatch({
      type: 'CONTACT_FORM_SUBMITTED',
      payload: { name, email, message },
    });
    alert("Thank you for your message! We'll be in touch soon.");
    navigate('/');
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="lg" sx={{ display: 'flex' }}>
        <CssBaseline />
        <ContactForm
          handleSubmit={handleSubmit}
          name={name}
          setName={setName}
          email={email}
          setEmail={setEmail}
          message={message}
          setMessage={setMessage}
        />
        <ContactInfo />
      </Container>
      <Box mt={8}>
        <Copyright sx={{ mt: 5 }} />
      </Box>
    </ThemeProvider>
  );
}
