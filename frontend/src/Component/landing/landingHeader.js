import * as React from 'react';
import { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import { Collapse, IconButton } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Link as Scroll } from 'react-scroll';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    fontFamily: 'Nunito',
  },
  colorText: {
    color: '#5553b7',
  },
  container: {
    textAlign: 'center',
  },
  title: {
    color: '#fff',
    fontSize: '4.5rem',
  },
  title2: {
    color: '#fff',
    fontSize: '2.0rem',
  },
  goDown: {
    color: '#5553b7',
  },
}));

export default function LandingHeader() {
  const classes = useStyles();
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    setChecked(true);
  }, []);

  return (
    <div className={classes.root} id="header">
      <Collapse
        in={checked}
        {...(checked ? { timeout: 1000 } : {})}
        collapsedHeight={50}
      >
        <div className={classes.container}>
          <h1 className={classes.title}>
            Welcome to <br />{' '}
            <span className={classes.colorText}>SunSationalShades.</span>
          </h1>
          <h3 className={classes.title2}>
            {' '}
            Begin To See The World{' '}
            <span className={classes.colorText}>SunSationally.</span>
          </h3>
          <Scroll to="landing-content" smooth={true}>
            <IconButton>
              <KeyboardArrowDownIcon
                className={classes.goDown}
                sx={{ fontSize: '4rem' }}
              />
            </IconButton>
          </Scroll>
        </div>
      </Collapse>
    </div>
  );
}
