import axios from 'axios';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
//import Link from '@mui/material/Link';
import { Link } from "react-router-dom";
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useNavigate } from "react-router-dom";
//import receiveEmail from './components/receiveEmail';
//import { useState } from 'react';

const { useState } = require("react");
const theme = createTheme();
  
const Reset = () => {
  const [receiveEmail,SetReceiveEmail] = useState('');
  const [Email,SetEmail] = useState('');
     const action = async(req,res)=>{
       let result = await axios.post(`http://localhost:8000/ResetPassword`,{Email:Email})
       console.log(result);
    } 
    return (
      <ThemeProvider theme={theme}>
        <Grid container component="main" sx={{ height: '100vh' }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage: 'url(https://source.unsplash.com/random)',
              backgroundRepeat: 'no-repeat',
              backgroundColor: (t) =>
                t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <AddCircleOutlineIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Reset password
              </Typography>
              <Box component="form" noValidate onSubmit= {action}sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                 // name="id"
                  label="Enter your mail"
                  type="Enter your mail"
                  id="Enter your mail"
                  autoComplete=""
                  onChange ={e =>SetEmail(e.target.value)}
                />
                <Button 
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }} 
                  onClick =  {() => SetReceiveEmail(true)}
                >
                  Reset Password
                </Button>
                {/* <Link to="/receiveEmail"
                onClick={() => SetReceiveEmail(true)}>
                  Reset Password
                  </Link>
                 */}
               
              </Box>
            </Box>
          </Grid>
        </Grid>
        <receiveEmail trigger = {receiveEmail} SetTrigger = {SetReceiveEmail}>
              <h3>
                hello
              </h3>
        </receiveEmail>
      </ThemeProvider>

    );
  }
  
export default Reset;

