import axios from 'axios';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import PageNotFound from './PageNotFound'

import Header from '../Headers/header';




const theme = createTheme({
  palette: {
    primary: {
      main: '#800000',
      light : '#963129',
      dark: '#963129'
    },
    secondary: {
      light: '#d32f2f',
      main: '#ef5350',
      contrastText: '#ffcc00',
    },
    custom: {
      light: '#ffa726',
      main: '#f57c00',
      dark: '#ef6c00',
      contrastText: 'rgba(0, 0, 0, 0.87)',
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
});


const { useState , useEffect} = require("react");


const Check = () =>{
  const [usernameInstructor, setUsername] = useState('');
    const [passwordInstructor, setPassword] = useState('');

    const add = async () => {
        let res = await axios.post('http://localhost:8000/addInstructor',{username : usernameInstructor , password : passwordInstructor})
        console.log(res);
    }

    return (
      <ThemeProvider theme={theme}>
        <Header/>
        <Container>
          <CssBaseline />
          <Grid item >
            <Box
              sx={{
                my: 9,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{mt:10, bgcolor: 'primary.main' }}>
              <AddCircleOutlineIcon />
              </Avatar>
              <Typography component="h1" variant="h4"  sx={{mt:1}}>
                Add Instructor
              </Typography>
              <Box component="form" noValidate onSubmit={add} sx={{ mt: 5 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete=""
                  autoFocus
                  onChange ={e =>setUsername(e.target.value)}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete=""
                  onChange ={e =>setPassword(e.target.value)}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Add
                </Button>
                
              </Box>
            </Box>
          </Grid>
        </Container>
        <br></br>
        <br></br>
        <br></br>

      </ThemeProvider>
    );
}

const AddInstructor = () => {

  const [type, setType] = useState('');
  useEffect(()=>{
    try{
      axios.get('http://localhost:8000/isLogin' ,{
        headers: {
            "token" :  localStorage.getItem("token")
        },
    }).then(
    (res) => { 
        const user = res.data;
        setType(user.type)
        })

    }
    catch(error){
      window.location.href=`/home`
    }
    
    });

    let Add;
    if(type=='Admin'){
      Add =<Check></Check>
    }
    else{
      Add =<PageNotFound></PageNotFound>
    }

    return(
      <Box>
        {Add}
      </Box>
    )

    
}
export default AddInstructor;