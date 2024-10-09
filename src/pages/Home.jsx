import React, { useState } from 'react';
import { Stack, Box, Button, TextField } from '@mui/material';
import { getUser,userReposLanguages,setUserNotFound } from '../store/slices/userSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Test from './Test';
const Home = () => {
  const products = [
    { id: 1, name: 'Product 1', price: 200, rating: 4.5 },
    { id: 2, name: 'Product 2', price: 150, rating: 3.5 },
  ];
  const dispatch = useDispatch();
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();
  const handleInputChange = (e) => {
    setUserName(e.target.value);
  };
  const handleButtonClick = () => {
    if (userName) {
      dispatch(setUserNotFound());
      dispatch(getUser(userName));
      dispatch(userReposLanguages(userName));
      navigate(`/resume/${userName}`);
    }else{
      setUserName(false)
    }
  };

  return (
    <Stack sx={{width:'calc(100% - 40px)',maxWidth:'600px',margin:'auto',gap:'20px',padding:'20px'}}>
      <Box component="h1">Home page</Box>
      <TextField
        required
        id="outlined-required"
        label="Enter user name"
        value={userName}
        onChange={handleInputChange}
      />
      {!userName&&(<Box component='span' sx={{color:'red'}}>User name required!</Box>)}
      <Button variant="contained" onClick={handleButtonClick}>
        Find user
      </Button>
      <Test products={products}/>
    </Stack>
  );
};

export default Home;
