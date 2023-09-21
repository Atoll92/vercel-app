import React from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { getAuth } from "firebase/auth";

import firebase from 'firebase/compat';
import pirate from '@/Assets/images/pirate.svg'
// import AppBar from '@mui/material/AppBar';
// // import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
// import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';
// import AccountCircle from '@mui/icons-material/AccountCircle';
// import Switch from '@mui/material/Switch';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import FormGroup from '@mui/material/FormGroup';
// import MenuItem from '@mui/material/MenuItem';
// import Menu from '@mui/material/Menu';
import { auth } from './firebase';


const Header = () => {
    const [user, setUser] = React.useState(); // Local signed-in state.
//   const [auth, setAuth] = React.useState(auth : Boolean);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();

  const handleChange = (event) => {
    navigate('/')
    firebase.auth().signOut()
    // if (event.target.checked) {
    // firebase.auth().signOut()
    
    // }
  };


  React.useEffect(() => {
    const unregisterAuthObserver = getAuth().onAuthStateChanged(user => {
      setUser(user)
    });

    return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
  }, []);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    // <Box sx={{ flexGrow: 1 }}>
    //   <FormGroup>
    //     <FormControlLabel
    //       control={
    //         <Switch
    //           checked={!!user}
    //           onChange={handleChange}
    //           aria-label="login switch"
    //         />
    //       }
    //       label={user ? 'Logout' : 'Login'}
    //     />
    //   </FormGroup>
    //   <AppBar position="static">
    //     <Toolbar>
    //       <IconButton
    //         size="large"
    //         edge="start"
    //         color="inherit"
    //         aria-label="menu"
    //         sx={{ mr: 2 }}
    //       >
    //         <MenuIcon />
    //       </IconButton>
    //       <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
    //         Naval Beef
    //       </Typography>
    //       {auth && (
    //         <div>
    //           <IconButton
    //             size="large"
    //             aria-label="account of current user"
    //             aria-controls="menu-appbar"
    //             aria-haspopup="true"
    //             onClick={handleMenu}
    //             color="inherit"
    //           >
               
    //              {/* <Link to="/"><button className='border p-2 hover:bg-black hover:text-white'><a onClick={() => firebase.auth().signOut()}>Sign-out</a></button> </Link> */}
    //             <AccountCircle >   <img
    //                 alt="Pirate Icon"
    //                 className="fill-white hover:text-blue-100"
    //                 height="100px"
    //                 src={pirate}
    //                 width="100px"
    //               /></AccountCircle>
    //           </IconButton>
    //           <Menu
    //             id="menu-appbar"
    //             anchorEl={anchorEl}
    //             anchorOrigin={{
    //               vertical: 'top',
    //               horizontal: 'right',
    //             }}
    //             keepMounted
    //             transformOrigin={{
    //               vertical: 'top',
    //               horizontal: 'right',
    //             }}
    //             open={Boolean(anchorEl)}
    //             onClose={handleClose}
    //           >
                
    //             <MenuItem onClick={handleClose}>Profile</MenuItem>
    //             <MenuItem onClick={handleClose}>My games</MenuItem>
    //           </Menu>
    //         </div>
    //       )}
    //     </Toolbar>
    //   </AppBar>
    // </Box>
    <div className='fixed top-0 left-0 right-0 bg-gradient-to-b space-between from-blue-200 to-blue-400'>
        <img
      alt="Pirate Icon"
      className="fill-white hover:text-blue-100"
      height="100px"
      src={pirate}
      width="100px"
    />
     <h1 className='text-center text-xl'>Naval Beef</h1>
    <Link to="/"><button className='border p-2 hover:bg-black hover:text-white'><a onClick={() => firebase.auth().signOut()}>Sign-out</a></button> </Link>
            
    </div>
  );
}


                
       

        
    //     <div className='fixed top-0 left-0 right-0 bg-gradient-to-b from-blue-200 to-blue-400'>
       
    //       <div className="px-10 justify-between flex gap-8 py-10">
    //       <AppBar position="static" color="primary" enableColorOnDark>
    //     {/* //             {appBarLabel('enableColorOnDark')} */}
    //     <img
    //   alt="Pirate Icon"
    //   className="fill-white hover:text-blue-100"
    //   height="100px"
    //   src={pirate}
    //   width="100px"
    // />
    //  <h1 className='text-center text-xl'>Naval Beef</h1>
    // <Link to="/"><button className='border p-2 hover:bg-black hover:text-white'><a onClick={() => firebase.auth().signOut()}>Sign-out</a></button> </Link>
    //            </AppBar>
               
              
    



      
    // );
// };

export default Header;