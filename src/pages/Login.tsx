import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { adminData } from "../models/admin";
import MainRouter from '../Router';

      

const LoginPage = () => {
    const [adminDetails, setAdminDetails] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const theme = createTheme();
    
    useEffect(() => {
        axios.get('https://adminapi-hldux24wua-el.a.run.app/').then(res => {
    
            setAdminDetails(res.data);
            
          //  console.log(res.data[0])
          // console.log(adminModel.length)
        });
        setRefresh(false);
    }, [refresh])

    
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log(adminDetails)
        console.log({
          username: data.get('username'),
          password: data.get('password'),
        });
       if(data.get('username') == "admin"  && data.get('password') == "apostrophy@123")
          { return MainRouter; }

      };
  return(
    
<ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary' }}>
            
          </Avatar>
          <Typography component="h2" variant="h5">
            Login
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
            
              </Grid>
              
            </Grid>
          </Box>
        </Box>
        
      </Container>
    </ThemeProvider>
  ); 

}

export default LoginPage;