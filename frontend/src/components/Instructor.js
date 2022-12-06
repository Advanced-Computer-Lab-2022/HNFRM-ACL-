import axios from 'axios';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import Link from '@mui/material/Link';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import Avatar from '@mui/material/Avatar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';

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


const { useState,useEffect } = require("react");
const theme = createTheme();

const ViewInstructor = () => { 
    const [instructor,setinstructor] = useState(" ");
    const params = new URLSearchParams(window.location.search)
    const instructorId = params.get('instructorId')
     
     useEffect(()=>{
     
           axios.get(`http://localhost:8000/viewInstructor?instructorId=${instructorId}`).then(
            (res) => { 
                const instructor = res.data
                console.log(instructor)
                setinstructor(instructor)
                })
        });
        return(
          
          <ThemeProvider theme={theme}>
              <CssBaseline />
              <Container maxWidth="lg">
              <Paper
                 sx={{
                 position: 'relative',
                 backgroundColor: 'primary.main',
                 color: '#fff',
                 mb: 4,
                 backgroundSize: 'cover',
                 backgroundRepeat: 'no-repeat',
                 backgroundPosition: 'center'
              }}>
                  <Box
                      sx={{
                      position: 'absolute',
                      top: 0,
                      bottom: 0,
                      right: 0,
                      left: 0,
                      backgroundColor: 'rgba(0,0,0,.3)',
              }}/>
  
                  <Grid container>
                    <Grid item md={6}>
                       <Box
                          sx={{
                          position: 'relative',
                          p: { xs: 3, md: 6 },
                          pr: { md: 0 },
              }}>
                <Avatar sx={{ m: 2, bgcolor: 'primary.main' }} onClick={() => window.location.href=`/edit?instructorId=${instructor._id}`}>
                  <EditTwoToneIcon />
              </Avatar>
              <Typography component="h1" variant="h3" color="inherit" gutterBottom>
                Welcome back, {instructor.username}
              </Typography>
              
              
              <Typography variant="h4" color="inherit" paragraph>
                  {instructor.email} 
              </Typography>
              <Rating name="rating" value={instructor.rating} readOnly/>
            </Box>
          </Grid>
        </Grid>
      </Paper>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>

      <Grid item xs={12} md={4}>
       <Paper elevation={0} sx={{ p: 2, bgcolor: 'grey.200' }}>
      <Typography variant="h4" gutterBottom>
        Reviews
      </Typography>
        {
          instructor.reviews.map((review) =>(
            <Typography variant="body1" gutterBottom>

              {review}
              </Typography>
          )
          )
        }
      </Paper>
      </Grid>
      

  <Copyright sx={{ mt: 5 }} />
    </Container>
   </ThemeProvider>
      )   
   
}
export default ViewInstructor;