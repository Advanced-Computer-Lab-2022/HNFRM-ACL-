import axios from 'axios';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import PageNotFound from './PageNotFound'


import Header from '../Headers/header'
import Footer from '../Headers/footer';
import { TextField } from '@mui/material';




const { useState,useEffect } = require("react");

const DialogWallet = () =>{

  const [open, setOpen] = useState(false);

  const [wallet , setWallet] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(()=>{
     
    axios.get(`http://localhost:8000/view`,
{headers: {"token" :  localStorage.getItem("token") }} ).then(
     (res) => { 
         const instructor = res.data
         setWallet(instructor.wallet)
         })
 });

  return (
    <div>
      <Button  variant = 'contained' onClick={handleClickOpen}>
         Wallet
    </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          
          <Grid>
          <Avatar sx={{ m:1,width: 206, height: 166 }}>
          <PaidOutlinedIcon sx ={{fontSize: "250px" , bgcolor: 'primary.main'}}/>
              </Avatar>
            <Typography variant = 'h4'>
              {wallet}
            </Typography>         

            
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
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





const ViewInstructor = () => { 
    const [instructor,setinstructor] = useState(" ");
    const [reviews,setReviews] = useState([]);
    
     
     useEffect(()=>{
     
           axios.get(`http://localhost:8000/view`,
     {headers: {"token" :  localStorage.getItem("token") }} ).then(
            (res) => { 
                const instructor = res.data
                console.log(instructor)
                setReviews(instructor.reviews)
                setinstructor(instructor)
                })
        });

        return(
          <ThemeProvider theme={theme}>
              <CssBaseline />
              <Header/>
              <Container maxWidth="lg">
              <Paper
                 sx={{
                 position: 'relative',
                 backgroundColor: 'primary.main',
                 color: '#fff',
                 mt :4,
                 mb: 4,
                 backgroundSize: 'cover',
                 backgroundRepeat: 'no-repeat',
                 backgroundPosition: 'center',
                 backgroundImage: `url(${require('./Professor.jpg')})`
              }}>
                  <Box
                      sx={{
                      position: 'absolute',
                      top: 0,
                      bottom: 0,
                      right: 0,
                      left: 0,
                      backgroundColor: 'rgba(0,0,0,.6)',
              }}/>
  
                  <Grid container>
                    <Grid item md={6}>
                       <Box
                          sx={{
                          position: 'relative',
                          p: { xs: 3, md: 6 },
                          pr: { md: 0 },
              }}>
              <Typography component="h1" variant="h3" color="inherit" gutterBottom>
                Welcome back, {instructor.username}
              </Typography>
              <Rating name="rating" value={instructor.rating} readOnly/>
              <DialogWallet/>
              <Typography variant="h6" color="inherit" paragraph>
                  {instructor.email}
              </Typography>
              <Typography variant="h6" color="inherit" paragraph>
                  {instructor.biography}
              </Typography>
              
            </Box>
          </Grid>
        </Grid>
      </Paper>

      <Grid item xs={12} md={4} sx={{mb:19}}>
       <Paper elevation={0} sx={{ p: 2, bgcolor: 'grey.200' }}>
      <Typography variant="h4" gutterBottom>
        Reviews
      </Typography>
      {
        reviews.map((review) =>(
          <Paper sx ={{width :"80%",height:"100%",mt:2 , ml:15}}>
            <Typography variant="body2">
                 {review} 
            </Typography>
          </Paper>
        ))
      }
        
      </Paper>
      </Grid>
    </Container>
    <Footer></Footer>
   </ThemeProvider>
      )   
   
}


const View =() =>{
  const [type, setType] = useState('');


  useEffect(()=>{
      axios.get('http://localhost:8000/isLogin' ,{
          headers: {
              "token" :  localStorage.getItem("token")
          },
      }).then(
      (res) => { 
          setType(res.data.type)
          
          })    
      } ) ;

  let view;
  if(type == 'Instructor'){
     view =<ViewInstructor/>
  } 
  else{
    view =<PageNotFound></PageNotFound>
  }

  return(
    <ThemeProvider theme={theme}>
    <Box>
    {view}
    </Box>
    </ThemeProvider>
  )
}
export default View;