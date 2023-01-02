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




import Header from '../Headers/header'
import Footer from '../Headers/footer';
import { TextField } from '@mui/material';



const { useState,useEffect } = require("react");



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

let id;


const DialogReview = () => {
  const [open, setOpen] = useState(false);

  const [review, setReview] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const write = async () =>{
        
    let res = await axios.patch(`http://localhost:8000/writeReviewInstructor?instructorId=${id}`,
    {review:review}
    )
    handleClose()
  }  

  return (
    <div>
      <Button variant = 'contained' onClick={handleClickOpen}>
         Write Review
    </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Write your review</DialogTitle>
        <DialogContent>
          
          <Grid>
          <TextField
            autoFocus
            margin="dense"
            id="description"
            label="Description"
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            onChange ={e =>setReview(e.target.value)}
          />
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={write}>Create</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const ViewTrainee = () =>{
    const [instructor,setinstructor] = useState(" ");
      const [reviews,setReviews] = useState([]);
  
      
      const params = new URLSearchParams(window.location.search)
      const instructorId = params.get('userId')
      //console.log(instructorId)
      
       
       useEffect(()=>{
       
             axios.get(`http://localhost:8000/trainee?userId=${instructorId}` ).then(
              (res) => { 
                  const instructor = res.data
                  console.log(instructor)
                  setReviews(instructor.reviews)
                  setinstructor(instructor)
                  })
          });
          id=instructorId    
  
  
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
                  {instructor.username}
                </Typography>
                <Rating name="rating" value={instructor.rating} readOnly/>
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
        <DialogReview/>
        
          
        </Paper>
        </Grid>
      </Container>
      <Footer></Footer>
     </ThemeProvider>
        )   
  
  }

  export default ViewTrainee;  