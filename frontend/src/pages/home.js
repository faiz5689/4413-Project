import * as React from 'react';
import { useEffect, useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import LandingContent from '../Component/landing/landingContent.js';
import LandingHeader from '../Component/landing/landingHeader.js';
import Video from '../Component/assets/videoeditedfinal.mp4';

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

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    backgroundSize: 'contain',
    position: 'relative',
  },
  videoContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    objectFit: 'cover',
  },
  video: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    minWidth: '100%',
    minHeight: '100%',
    transform: 'translate(-50%, -50%)',
    objectFit: 'cover',
  },
  content: {
    position: 'relative',
  },
  colorText: {
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
      <CssBaseline />
      <div className={classes.videoContainer}>
        <video className={classes.video} autoPlay muted loop>
          <source src={Video} type="video/mp4" />
        </video>
      </div>
      <div className={classes.content}>
        <LandingHeader />
        <LandingContent />
      </div>
    </div>
  );
}
