import axios from 'axios';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
const { useState , useEffect} = require("react");

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

const FormForget = () => {
  const [open, setOpen] = useState(false);
  const [email,setEmail]= useState('')
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const forget = async(email) =>{
    axios.post(`http://localhost:8000/recievePassword`,{email:email})
    .then((res) =>{
      console.log(res);
    })
  }

  

  return (
    <div>
      <Link href="#" variant="body2" onClick={handleClickOpen} color='primary'>
          Forgot password?
    </Link>
      <Dialog open={open} onClose={handleClose} >
        <DialogTitle>Forgetten Password</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter your email address in order to send the new password to it
          </DialogContentText>
          <Grid>
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Email Address"
            fullWidth
            variant="outlined"
            onChange ={e =>setEmail(e.target.value)}
          />
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <FormRecieve onClick={forget(email)}/>
          
        </DialogActions>
      </Dialog>
    </div>
  );
}

const FormRecieve = () => {
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
            The Email sent successfully try to log again using the new password
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

const SignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState(false);
  const [type , setType] = useState('');
  const [contract , setContract] = useState('');

  //axios.defaults.withCredentials = true;

  const signin = async () => {
    
    axios.post(`http://localhost:8000/login`,{username : username , password : password})
    .then((res) =>{
      console.log(res.data)
      if(!res.data.auth){
        setStatus(false);
      }
      else{
        localStorage.setItem("token", res.data.token);
        setStatus(true);
        setType(res.data.result.type)
        setContract(res.data.result.contract)
        console.log(res.data.result.contract)
      }
    }
    )
  }

  useEffect(()=>{
    if(type=='Instructor' && status && contract=='false'){
      window.location.href=`/contract`
    }
    else if(status){
      window.location.href=`/home`
    }
    });

  

  return (
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
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box component="form" sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              onChange ={e =>setUsername(e.target.value)}
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
              onChange ={e =>setPassword(e.target.value)}
              autoComplete="current-password"
            />
            <Button
              //type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              //onSubmit={signin}
              onClick = {signin}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
              <FormForget/>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2" onClick={() => window.location.href=`/SignUp`}>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        
      </Container>
      <Copyright sx={{ mt: 31, mb: 4 }} />
    </ThemeProvider>
    
  );
}

export default SignIn;