import axios from 'axios';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { Paper } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Link from '@mui/material/Link';

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

const { useState } = require("react");

const Edit=()=>{
     const params = new URLSearchParams(window.location.search)
     const instructorId = params.get('instructorId')
     const [email,setEmail]=useState(instructorId.email);
     const [biography,setBio]=useState(instructorId.biography);

     const edit = async () => {
        let res = await axios.post(`http://localhost:8000/edit?instructorId=${instructorId}`,
        {email:email , biography : biography})
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
              md={3.5}
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
                <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                <EditIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Edit
                </Typography>
                <Box component="form" noValidate onSubmit={edit} sx={{ mt: 1 }}>
                  <TextField
                    margin="normal"
                    
                    fullWidth
                    id="email"
                    label="Email"
                    name="email"
                    autoComplete=""
                    autoFocus
                    onChange ={e =>setEmail(e.target.value)}
                  />
                  <TextField
                    margin="normal"
                    
                    fullWidth
                    name="bio"
                    label="Biography"
                    id="bio"
                    autoComplete=""
                    onChange ={e =>setBio(e.target.value)}
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Edit
                  </Button>
                  <Copyright sx={{ mt: 5 }} />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </ThemeProvider>
      );
}

export default Edit;