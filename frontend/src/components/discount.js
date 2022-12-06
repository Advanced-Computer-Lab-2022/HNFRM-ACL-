import axios from 'axios';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const { useState } = require("react");
function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        HNFRM
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

const Discount = () => { 
    const params = new URLSearchParams(window.location.search);
    const courseId = params.get('courseId')
    const [periodofdiscount, setPeriodofdiscount] = useState('');
    const [discount, setDiscount] = useState('');


    const add = async () => {
        let res = await axios.post(`http://localhost:8000/discount?courseId=${courseId}`,{amount : discount , howLong : periodofdiscount})
        console.log(res);
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
            <Typography component="h1" variant="h5">
              Define a discount
            </Typography>
              <TextField
                margin="normal"
                required
                fullWidth
                label="Discount %"
                name="discount"
                id="discount"
                onChange ={e =>setDiscount(e.target.value)}
              />
              <Box component="form" noValidate onSubmit={add} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                label="Period of discount"
                name="period"
                id="period"
                onChange ={e =>setPeriodofdiscount(e.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Submit
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
export default Discount;