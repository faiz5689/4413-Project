import React, { useState } from 'react';
import { Link } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import { Toolbar, Typography } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Button from '@mui/material/Button';
import { Icon } from '@iconify/react';

const Header = () => {
    const [value, setValue] = useState();
    return(
        // <div>
        //     <li>
        //         <Link to="/">Home</Link>
        //     </li>
        //     <li>
        //         <Link to="/login">Login</Link>
        //     </li>
        //     <li>
        //         <Link to="/checkout">Checkout</Link>
        //     </li>
        //     <li>
        //         <Link to="/register">Register</Link>
        //     </li>
        // </div>

        <React.Fragment>
            <AppBar position= "sticky" sx={{background: "linear-gradient(109.6deg, rgb(9, 9, 121) 11.2%, rgb(144, 6, 161) 53.7%, rgb(0, 212, 255) 100.2%)"}}>
                <Toolbar>
                    <Icon icon="mdi:glasses" width="50" height="50" />
                    <Typography sx={{marginLeft:"10px"}}>
                        SunsationalShades
                    </Typography>
                        <Tabs 
                            sx={{marginLeft:"auto"}} 
                            textColor="inherit"
                            value={value} 
                            onChange={(e,value)=> setValue(value)} 
                            TabIndicatorProps={{ style: { background: "#FADA5E" } } }>
                                <Tab component={Link} to="/" label="Home"></Tab>
                                <Tab component={Link} to="/products" label="Products"></Tab>
                                <Tab component={Link} to="/checkout" label="Checkout"></Tab>
                        </Tabs>
                        <Button onClick={() => setValue(false)} component={Link} to="/login" variant="contained" color="primary" sx={{marginLeft:"auto"}}>LOGIN</Button>
                        <Button onClick={() => setValue(false)} component={Link} to="/register" variant="contained" color="primary" sx={{marginLeft:"10px"}}>SIGN UP</Button>

                </Toolbar>
            </AppBar>
        </React.Fragment>
    );
}

export default Header;