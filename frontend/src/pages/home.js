import * as React from 'react';
import { useEffect, useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import Image from '../Component/assets/background4.jpg';
import LandingContent from '../Component/landing/landingContent.js';
import LandingHeader from '../Component/landing/landingHeader.js';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © SunSational Shades, '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// const theme = createTheme();
const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    backgroundImage: `url(${Image})`,
    backgroundRepeat:"no-repeat",
    backgroundSize:'cover',
  },
  colorText:{
    color: '#5Aff3D',
  },
  container: {
    textAlign: 'center',
  },
  title: {
    color: '#fff',
    fontSize: '4.5rem',
  },
  goDown: {
    color: '#5AFF3D',
  },
}));

export default function Home(props) {
  const classes = useStyles();
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    setChecked(true);
  }, []);

    

  return (
    <div className={classes.root}>
      <CssBaseline/>
      <LandingHeader/>
      <LandingContent/>
    </div>
  );

}