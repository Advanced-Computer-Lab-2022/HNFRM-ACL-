import axios from 'axios';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ReactPlayer from 'react-player'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Rating from '@mui/material/Rating';
const { useState,useEffect } = require("react");

function Copyright(props) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="https://mui.com/">
          Your Website
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }
  const theme = createTheme();

  const ViewCourseInstructor = () => { 
    const [course,setCourse] = useState(" ");
    const params = new URLSearchParams(window.location.search)
    const courseId = params.get('courseId')
    useEffect(()=>{
        axios.get(`http://localhost:8000/course?courseId=${courseId}`).then(
        (res) => { 
            const course = res.data
            
            console.log(course)
            setCourse(course)
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
                <Typography component="h1" variant="h3" color="inherit" gutterBottom>
                  {course.title}
                </Typography>
                
                <Typography variant="h4" color="inherit" paragraph>
                    {course.credithours} Hours
                </Typography>
                <Typography variant="h4" color="inherit" gutterBottom>
                    {course.price} EGP
                </Typography>
                <Rating name="rating" value={course.rating} readOnly/>
                <Typography variant="h5" color="inherit" paragraph>
                  {course.summary}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Paper>
        <br></br>
        <Button variant="outlined" onClick={() => window.location.href=`/createExam?courseId=${course._id}`}>Create Exercises </Button>
        <br></br>
        <br></br>
        <br></br>
        <Button variant="outlined" onClick={() => window.location.href=`/uploadVideo?courseId=${course._id}`}>Upload Links </Button>
        <br></br>
        <br></br>
        <br></br>
        <br></br>

        <Grid item xs={12} md={4}>
         <Paper elevation={0} sx={{ p: 2, bgcolor: 'grey.200' }}>
        <Typography variant="h4" gutterBottom>
          Reviews
        </Typography>
        <Typography variant="body1" gutterBottom>
          {course.reviews}
        </Typography>
        </Paper>
        </Grid>
        

    <Copyright sx={{ mt: 5 }} />
      </Container>
     </ThemeProvider>
        )    
  }
  export default ViewCourseInstructor;