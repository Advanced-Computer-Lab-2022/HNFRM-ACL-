import axios from 'axios';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/AddCircleOutline';
import Container from '@mui/material/Container';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import PageNotFound from './PageNotFound'

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

const FormChange = () => {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  

  

  return (
    <div>
      <Button color='primary' onClick={handleClickOpen}>
            Enter
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            We successfully changed your password please login again
          </DialogContentText>
          
        </DialogContent>
        <DialogActions>
          <Button onClick={() => window.location.href=`/login`}>Cancel</Button>
          <Button onClick={() => window.location.href=`/login`}>Enter</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const { useState ,useEffect} = require("react");

const Check = () =>{
  const [username,setUsername]=useState('');
  const [newPassword,setNewPassword]=useState('');
  const [pol,setPol] = useState('true')
  const [type, setType] = useState('');

   const changePassword =  () => {

        axios.patch(`http://localhost:8000/changepassword`,
      {username:username,password:newPassword})

      }
      
      

    
    

    const check = async () => {
      axios.get('http://localhost:8000/isLogin' ,{
        headers: {
            "token" :  localStorage.getItem("token")
        },
    }).then(
    (res) => { 
        const user = res.data;
        setType(user.type)
        setPol(user.policy)
        })
    }
      
      
      
  
   
  return (
      <ThemeProvider theme={theme}>
        <Header />
        <Box>
        <Container component="main" >
          <CssBaseline />
          <Grid item sx= {{height:'100%' , width :'100%'}} >
            <Paper  >
            <Box
              sx={{
                mt:10,
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
                Change password
              </Typography>
              <Box component="form"  sx={{ mt: 1 }}>

              <TextField
                  margin="normal"
                  fullWidth
                  name="username"
                  label="Username"
                  type="username"
                  id="username"
                  autoComplete=""
                  onChange ={e =>setUsername(e.target.value)}
                  sx={{
                    mb: 5,  
                  }}
                  
                />

                <TextField
                  margin="normal"
                  fullWidth
                  name="oldpassword"
                  label="Old Password"
                  type="password"
                  id="oldpassword"
                  autoComplete=""
                  sx={{
                    mb: 5,  
                  }}
                />
                
                <TextField
                  margin="normal"
                  fullWidth
                  name="newpassword"
                  label="New Password"
                  type="password"
                  id="newpassword"
                  autoComplete=""
                  onChange ={e =>setNewPassword(e.target.value)}
                  sx={{
                    mb: 5,  
                  }}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 9 }}
                  onSubmit={changePassword}
                  
                >
                  Submit
                </Button>
                
              </Box>
            </Box>
            </Paper>
          </Grid>
          
        </Container>
        </Box>
        <Footer/>
      </ThemeProvider>
    );

}

const Changepassword=()=>{
  const [type, setType] = useState('');
  useEffect(()=>{
    axios.get('http://localhost:8000/isLogin' ,{
        headers: {
            "token" :  localStorage.getItem("token")
        },
    }).then(
    (res) => { 
        const user = res.data;
        setType(user.type)
        })
    });

    let Add;
    if(type=='Instructor'){
      Add =<Check></Check>
    }else if(type=='Individual Trainee'){
      Add =<Check></Check>
    }else if(type=='Corporate Trainee'){
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

export default Changepassword;
