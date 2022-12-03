import axios from 'axios';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
//import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
//const theme = createTheme();
const { useState } = require("react");
const theme = createTheme();

const Discount = async(req,res)=>{
const params = new URLSearchParams(window.location.search);
const CID = window.location.href.split('/').at(4);
const [periodofdiscount, SetPeriodofdiscount] = useState('');
const [discount, SetDiscount] = useState('');


const data = async() =>{
    await axios.get(`http://localhost:8000/discount`+ CID + '?periodofdiscount=' + periodofdiscount).then(
       (res) => {
            SetPeriodofdiscount(res.data['periodofdiscount'])
        }
   ) 
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
              Change Password
            </Typography>
            <Box component="form" noValidate onSubmit={data} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
               // name="id"
                label="period of discount"
                type="period of discount"
                id="period of discount"
                autoComplete=""
                onChange ={e =>SetPeriodofdiscount(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
               // name="id"
                label="discount %"
                type="discount %"
                id="discount %"
                autoComplete=""
                onChange ={e =>SetDiscount(e.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                submit
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );

}
export default Discount;