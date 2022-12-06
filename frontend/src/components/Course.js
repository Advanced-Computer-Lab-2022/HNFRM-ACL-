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


const ViewCourse = () => { 
    const [course,setCourse] = useState(" ");
    const [courseSubtitles,setCourseSubtitles] = useState(" ");
    const [CourseRate,setCourseRate] = useState ("");
    const [InstructorRate,setInstructorRate] = useState ("");
    const [instructorId,setInstructorId] = useState ("");
    const params = new URLSearchParams(window.location.search)
    const courseId = params.get('courseId')

    

    useEffect(()=>{
        axios.get(`http://localhost:8000/course?courseId=${courseId}`).then(
        (res) => { 
            const course = res.data
            const courseSubtitles = course.subtitles
            
            console.log(course)
            setCourse(course)
            setCourseSubtitles(courseSubtitles)
            setInstructorId(course.taughtBy)
            })
        });

      const rateCourse = async () => {
          let res = await axios.patch(`http://localhost:8000/rateCourse?courseId=${courseId}`,{rating:CourseRate})
          console.log(res);
      }

      const rateInstructor = async () => {
        let res = await axios.patch(`http://localhost:8000/rateInstructor?instructorId=${instructorId}`,{rating:InstructorRate})
        console.log(res);
    }
    

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
    <div className='wrapper'> 
    <Typography  variant="h4">
          Course Preview
      </Typography>      
          <div className='youtube-box'>
              <ReactPlayer url={course.link} className='video' controls/>
          </div>
      </div>
    
    <Grid container spacing={5} sx={{ mt: 8 }}>
      <Grid item xs={12} md={4}>
      <Typography component="h2" variant="h4">
          Rate The Course
      </Typography>
        <Rating name="rating" value={CourseRate} onChange = {e =>setCourseRate(e.target.value)} onClick={rateCourse}/>
    
      </Grid>
      <Grid item xs={12} md={7}>
      <Typography component="h2" variant="h4">
          Taught By: {course.instructorName}
      </Typography>
      <br></br>
      <Rating name="rating2" value={InstructorRate} onChange = {e =>setInstructorRate(e.target.value)} onClick={rateInstructor}/>
    </Grid>
      </Grid>
    <br></br>
    <Button variant="outlined" fullWidth onClick={() => window.location.href=`/viewExercies?courseId=${course._id}`}>View Exercises</Button>
    <br></br>
    <br></br>
    <Button variant="outlined" onClick={() => window.location.href=`/discount?courseId=${course._id}`} >Define Discount</Button>
    <br></br>
    <br></br>
    <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
        <CardActionArea component="a" >
          <Card sx={{ display: 'flex' }} onClick={() => window.location.href=`/viewVideo?courseId=${course._id}&subtitle=1`}
              key={course._id} >
            <CardContent sx={{ flex: 1 }}>
              <Typography  variant="h5" gutterBottom>
                {courseSubtitles[0]}
              </Typography>
              <Typography variant="subtitle1" paragraph>
                1 Credit Hour
              </Typography>
            </CardContent>
          </Card>
        </CardActionArea>
      </Grid>
    </Grid>
    <br></br>
  
    <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
        <CardActionArea component="a" href="#">
          <Card sx={{ display: 'flex' }} onClick={() => window.location.href=`/viewVideo?courseId=${course._id}&subtitle=2`}>
            <CardContent sx={{ flex: 1 }}>
              <Typography  variant="h5" gutterBottom>
                {courseSubtitles[1]}
              </Typography>
              <Typography variant="subtitle1" paragraph>
                1 Credit Hour
              </Typography>
            </CardContent>
          </Card>
        </CardActionArea>
      </Grid>
    </Grid>
    <br></br>
    <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
        <CardActionArea component="a" href="#">
          <Card sx={{ display: 'flex' }} onClick={() => window.location.href=`/viewVideo?courseId=${course._id}&subtitle=3`}>
            <CardContent sx={{ flex: 1 }}>
              <Typography  variant="h5" gutterBottom>
                {courseSubtitles[2]}
              </Typography>
              <Typography variant="subtitle1" paragraph>
                1 Credit Hour
              </Typography>
            </CardContent>
          </Card>
        </CardActionArea>
      </Grid>
    </Grid>
    <br></br>
    <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
        <CardActionArea component="a" href="#">
          <Card sx={{ display: 'flex' }} onClick={() => window.location.href=`/viewVideo?courseId=${course._id}&subtitle=4`}>
            <CardContent sx={{ flex: 1 }}>
              <Typography  variant="h5" gutterBottom>
                {courseSubtitles[3]}
              </Typography>
              <Typography variant="subtitle1" paragraph>
                1 Credit Hour
              </Typography>
            </CardContent>
          </Card>
        </CardActionArea>
      </Grid>
    </Grid>
    <br></br>
<Copyright sx={{ mt: 5 }} />
  </Container>
 </ThemeProvider>
    )    

    
}

export default ViewCourse;