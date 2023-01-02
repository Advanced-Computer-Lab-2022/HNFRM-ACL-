import axios from 'axios';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import EditIcon from '@mui/icons-material/Edit';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Header from '../Headers/header'
import Footer from '../Headers/footer';

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

const Edit=()=>{
     //const params = new URLSearchParams(window.location.search)
     //const instructorId = params.get('instructorId')
     const [email,setEmail]=useState('');
     const [biography,setBio]=useState('');
     const [instructor,setinstructor] = useState(" ");

     useEffect(()=>{
     
      axios.get(`http://localhost:8000/view`,
{headers: {"token" :  localStorage.getItem("token") }} ).then(
       (res) => { 
           const instructor = res.data
           console.log(instructor)
           setinstructor(instructor)
           //setBio(instructor.biography)
           //setEmail(instructor.email)
           })

   });

     const edit = async () => {
        let res = await axios.patch(`http://localhost:8000/edit`,
        {email:email , biography:biography},
        {headers: {"token" :  localStorage.getItem("token")}
        })
        console.log(res);
    } 
     console.log(instructor.username)
    return (
        <ThemeProvider theme={theme}>
          <Header/>
          <Box>
          <Grid container component="main" sx={{mt:9}}>
            <CssBaseline />
            <Grid item sx= {{height:'100%' , width :'100%'}}>
              <Paper>
              <Box
                sx={{
                  mt:1,
                  mb:1,
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
                <Box component="form" onSubmit={edit} sx={{ mt: 1 }}>
                 <TextField
                 fullWidth
                  disabled
                  id="outlined-disabled"
                  value={instructor.username}
                  //defaultValue={instructor.username}
                  />
                  <TextField
                  sx={{borderColor: 'primary.main'}}
                  fullWidth
                    margin="normal"
                    id="email"
                    name="email"
                    autoComplete=""
                    autoFocus
                    //value={email}
                    defaultValue= {"email"}
                    onChange ={e =>setEmail(e.target.value)}
                  />
                  <TextField
                    margin="normal"
                    fullWidth
                    name="bio"
                    id="bio"
                    multiline
                    rows ={4}
                    autoComplete=""
                    //value={biography}
                    defaultValue= {"Biography"}
                    onChange ={e =>setBio(e.target.value)}
                    
                  />
                  
                  <Button
                    type="submit"
                    //fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Edit
                  </Button>
                  
                </Box>
              </Box>
              </Paper>
            </Grid>
          </Grid>
          </Box>
          <Footer/>
        </ThemeProvider>
      );
}

export default Edit;